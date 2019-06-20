var Q = require('q');
var crud = require('crud-sdk');
const express = require('express');
const fs = require('fs');
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});




service = {}

module.exports = service;

var hashes;
var validHashes=[];


service.getimg = getimg;
service.displayimg = displayimg;
service.uploadFiles = uploadFiles;
service.deleteFile = deleteFile;

function getimg(oneFile) {
    var deferred = Q.defer();
    //console.log(typeof(hash));
    crud.create('mongodb://127.0.0.1:27017/','filehashes','hashes',oneFile,function(err,data){
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
    crud.readByCondition('mongodb://127.0.0.1:27017/','filehashes','hashes',{},{},function(err,result){
        if(err)
            deferred.reject(err);
        console.log(result);
        this.hashes = result;
        deferred.resolve(this.hashes);
    })
    return deferred.promise;
}

async function uploadFiles(files){
    var deferred = Q.defer();
    await hashIt(files);
    deferred.resolve(files);
    return deferred.promise;
}

async function hashIt(files){
    await new Promise(next => {
    for(let ffile of files){
        let testFile = fs.readFileSync(ffile.destination + ffile.filename);
        //Creating buffer for ipfs function to add file to the system
        let testBuffer = new Buffer.from(testFile); 
        addFilesToIPFS(testBuffer)
            .then((hashedfile)=>{
            console.log('inside async funct of addFiles to IPFS')
            console.log(typeof(tempFile))
            ffile.hash = hashedfile.hash
            console.log('tempFile: ' +ffile.hash +' filename: '+ ffile.filename);
            console.log(typeof(ffile))
            getimg(ffile);
            next();
            })
        }  
    })
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
        validHashes.push(hashedfile);
        deferred.resolve(hashedfile[0]);
    })
    return deferred.promise;

}

function deleteFile(_id){
    var deferred = Q.defer();
    crud.deleteById('mongodb://127.0.0.1:27017/','filehashes','hashes', _id, function (err, result) {
        if (err) deferred.reject(err)
        deferred.resolve();
    });
    return deferred.promise;
}
