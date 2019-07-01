const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');
const fs = require('fs');
let serverURL = 'http://localhost:3000/api';
let server = require('../app')

chai.use(chaiHttp);
var agent = chai.request.agent(server);


describe('Tests for app.js', function () {

    console.log('Testing');
    let querystring = '?cs=mongodb%3A%2F%2F127.0.0.1%3A27017%2F&db=filehashes&coll=hashes'

    describe('Tests for /upload', function () {
        // it('Upload files along with form data to MongoDB', (done) => {
        //     chai.request(serverURL).post('/upload' + querystring)
        //         .type('form')
        //         .field('fileInformation', JSON.stringify([{ 'cool': 'cool1' }, { 'cool': 'cool2' }]))
        //         .attach('uploads[]', __dirname + '/uploads/file1.txt', 'file1.txt')
        //         .attach('uploads[]', __dirname + '/uploads/file2.txt', 'file2.txt')
        //         .then((result) => {
        //             expect(result).to.have.status(200);
        //         })
        //     done();
        // })

        /*it('Upload files with mismatch in formData and number of files', (done) => {
            chai.request(serverURL).post('/upload' + querystring)
                .type('form')
                .field('fileInformation', JSON.stringify([{ 'cool': 'cool1' }]))
                .attach('uploads[]', __dirname + '/uploads/file1.txt', 'file1.txt')
                .attach('uploads[]', __dirname + '/uploads/file2.txt', 'file2.txt')
                .catch((err) => {
                    expect(result).to.have.status(400);
                    console.log('error for /upload: ' + err);
                })
            done();
        })*/

        // it('Does not crash when query string is missing', (done) => {
        //     chai.request(serverURL).post('/upload')
        //         .type('form')
        //         .field('fileInformation', JSON.stringify([{ 'cool': 'cool1' }, { 'cool': 'cool2' }]))
        //         .attach('uploads[]', __dirname + '/uploads/file1.txt', 'file1.txt')
        //         .attach('uploads[]', __dirname + '/uploads/file2.txt', 'file2.txt')
        //         .catch((err) => {
        //             expect(result).to.have.status(400);
        //             console.log('error for /upload: ' + err);
        //         })
        //     done();
        // })


        // it('Gives 404 with wrong server URL', (done) => {
        //     chai.request(serverURL).post('/uploadojh' + querystring)
        //         .type('form')
        //         .field('fileInformation', JSON.stringify([{ 'cool': 'cool1' }, { 'cool': 'cool2' }]))
        //         .attach('uploads[]', __dirname + '/uploads/file1.txt', 'file1.txt')
        //         .attach('uploads[]', __dirname + '/uploads/file2.txt', 'file2.txt')
        //         .catch((err) => {
        //             expect(err).to.have.status(404);
        //         })
        //     done();
        // })
    })

    describe('Tests for /returnFiles', function () {
        // it('Returns files from MongoDB', (done) =>{
        //     chai.request(serverURL).get('/returnFiles' + querystring)
        //     .then((res)=>{
        //         console.log(res.body);
        //         expect(res).to.have.status(200);
        //         for(let i=0; i<res.body.length; i++)
        //             expect(res.body[i]).include.all.keys('hash','urlForAccess');
        //     })
        //     .catch((err)=>{
        //         console.log('error for /returnFiles: '+err)
        //     })
        //     done();
        // })

        // it('/returnFiles does not crash when query string is missing', (done) =>{
        //     chai.request(serverURL).get('/returnFiles')
        //     .catch((err)=>{
        //         expect(res).to.have.status(400);
        //     })
        //     done();
        // })

        // it('Returns empty array when DB is empty', (done)=>{
        //     chai.request(serverURL).get('/returnFiles' + querystring)
        //     .then((res)=>{
        //         expect(res).to.have.status(200);
        //         expect(res.body).to.be.empty;
        //     })
        //     done();
        // })

        // it('Gives 404 with wrong URL', (done) =>{
        //     chai.request('http://localhost:3000').get('/returnFiles')
        //     .catch((err)=>{
        //         expect(res).to.have.status(404);
        //     })
        //     done();
        // })
    })

    describe('Tests for /updateFile', function () {
        //add a valid object ID first
        let objID = '5d1999048c628d359812728e';
        // it('Updates single files along with form data to MongoDB', (done) => {
        //     chai.request(serverURL).put('/updateFile/'+ objID + querystring)
        //         .type('form')
        //         .field('fileInformation', JSON.stringify({ 'cool': 'fool1' }))
        //         .attach('file', __dirname + '/uploads/file3.txt', 'file3.txt')
        //         .then((result) => {
        //             expect(result).to.have.status(200);
        //         })
        //     done();
        // })
        // let fakeObjID = 'sddghje'
        // it('/updateFiles for Mongo ID that does not exist', (done) => {
        //     chai.request(serverURL).put('/updateFile/'+ fakeObjID + querystring)
        //         .type('form')
        //         .field('fileInformation', JSON.stringify({ 'cool': 'fool1' }))
        //         .attach('file', __dirname + '/uploads/file3.txt', 'file3.txt')
        //         .catch((err) => {
        //             expect(err).to.have.status(400);
        //         })
        //     done();
        // })

        // it('/updateFile Does not crash when query string is missing', (done) => {
        //     chai.request(serverURL).put('/updateFile/'+ objID)
        //     .type('form')
        //     .field('fileInformation', JSON.stringify({ 'cool': 'fool1' }))
        //     .attach('file', __dirname + '/uploads/file3.txt', 'file3.txt')
        //     .catch((err) => {
        //         expect(err).to.have.status(400);
        //     })
        //     done();
        // })

        it('/updateFile gives 404 when Object ID is missing', (done) => {
            chai.request(serverURL).put('/updateFile/')
            .type('form')
            .field('fileInformation', JSON.stringify({ 'cool': 'fool1' }))
            .attach('file', __dirname + '/uploads/file3.txt', 'file3.txt')
            .catch((err) => {
                expect(err).to.have.status(404);
            })
            done();
        })
    })

    describe('Tests for /delete', function () {
        //add a valid object ID first
        let objID = '5d19afd00a9135435a43b608';
        // it('Deletes single files along with form data to MongoDB', (done) => {
        //     chai.request(serverURL).delete('/delete/'+ objID + querystring)
        //         .then((result) => {
        //             expect(result).to.have.status(200);
        //         })
        //     done();
        // })
        // let fakeObjID = 'sddghje'
        // it('/deleteFiles for Mongo ID that does not exist', (done) => {
        //     chai.request(serverURL).delete('/delete/'+ fakeObjID + querystring)
        //         .catch((err) => {
        //             expect(err).to.have.status(400);
        //         })
        //     done();
        // })

        it('/deleteFile does not crash when query string is missing', (done) => {
            chai.request(serverURL).delete('/delete/'+ objID)
            .catch((err) => {
                expect(err).to.have.status(400);
            })
            done();
        })

    })

});