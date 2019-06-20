var Q = require('q');
var crud = require('crud-sdk');
const express = require('express');
const fs = require('fs');
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});


const mongoURL = 'mongodb://127.0.0.1:27017/';
const dbName ='filehashes'
const collectionName = 'hashes'

//var mongoURL, dbName, collectionName;

//to delete files after use
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)


service = {}

module.exports = service;

//var hashes;
//var validHashes=[];


service.getimg = getimg;
service.displayimg = displayimg;
service.uploadFiles = uploadFiles;
service.deleteFile = deleteFile;

function getimg(oneFile) {
    var deferred = Q.defer();
    console.log(typeof(oneFile));
    crud.create(mongoURL, dbName, collectionName, oneFile, function(err,data){
        if(err) {
            console.log(err);
            deferred.reject('error');}
    })
    console.log('oneFile: ' +oneFile);
    if(oneFile == undefined)
        deferred.reject('error');
    deferred.resolve();
    return deferred.promise;
}

function displayimg(){
    var deferred = Q.defer();
    crud.readByCondition(mongoURL, dbName, collectionName,{},{},function(err,result){
        if(err)
            deferred.reject(err);
        console.log(result);
        this.hashes = result;
        deferred.resolve(this.hashes);
    })
    return deferred.promise;
}

async function uploadFiles(files, formdata){
    var deferred = Q.defer();
    console.log('inside uploadFiles')
    await hashIt(files, formdata);
    deferred.resolve();
    return deferred.promise;
}

/*async function hashIt(files, formdata){
    await new Promise(next => {
        let testFile = fs.readFileSync(files.destination + files.filename);
        //Creating buffer for ipfs function to add file to the system
        let testBuffer = new Buffer.from(testFile); 
        addFilesToIPFS(testBuffer)
            .then((hashedfile)=>{
            console.log('inside async funct of addFiles to IPFS')
            //console.log(typeof(tempFile))
            files.hash = hashedfile.hash
            console.log('tempFile: ' +files.hash +' filename: '+ files.filename);
            // addInfoToFiles(files, formdata).then((returnedfiles)=>{
            // //console.log(typeof(files))
            // files = returnedfiles;
            // console.log(files);
            Object.assign(files,formdata)
            getimg(files);
            next();
            
            })
    })
}*/

async function hashIt(files, formdata, dbinfo){
    var data = JSON.parse(formdata.fileInformation)
    // mongoURL = dbinfo.cs;
    // dbName = dbinfo.db;
    // collectionName = dbinfo.coll;
    await new Promise(next => {
    for(let i=0; i<files.length;i++){
        let testFile = fs.readFileSync(files[i].destination + files[i].filename);
        //Creating buffer for ipfs function to add file to the system
        let testBuffer = new Buffer.from(testFile); 
        addFilesToIPFS(testBuffer)
            .then((hashedfile)=>{
            console.log('inside async funct of addFiles to IPFS')
            console.log(typeof(tempFile))
            files[i].hash = hashedfile.hash
            console.log('tempFile: ' +files[i].hash +' randomid: '+ data[i].randomID);
            Object.assign(files[i],data[i]);
            getimg(files[i]);
            unlinkAsync(files[i].destination + files[i].filename); //to delete the file
            next();
            })
        }  
    })
}

async function addInfoToFiles(file, info){
    var deferred = Q.defer();
    await Object.assign(file,info);
    console.log('in addinfo: ' +file.projectID);
    return deferred.resolve(file);
    
}


async function addFilesToIPFS(testBuffer){
    var deferred = Q.defer();
    console.log('inside addFiles to IPFS')
    await ipfs.files.add(testBuffer, function (err, hashedfile) {
        if (err) {
            console.log(err);
        }
        console.log(hashedfile);
        console.log('right after logging hashed file')
        //validHashes.push(hashedfile);
        deferred.resolve(hashedfile[0]);
    })
    return deferred.promise;

}

function deleteFile(_id){
    var deferred = Q.defer();
    crud.deleteById(mongoURL, dbName, collectionName, _id, function (err, result) {
        if (err) deferred.reject(err)
        deferred.resolve();
    });
    return deferred.promise;
}
