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


describe('Tests for app.js', function(){
    console.log('Testing');
    let querystring = '?cs=mongodb%3A%2F%2F127.0.0.1%3A27017%2F&db=filehashes&coll=hashes'
    it('Upload files along with form data to MongoDB', (done)=>{
        chai.request(serverURL).post('/upload' + querystring)
            .type('form')
            .field('fileInformation',JSON.stringify([{'cool':'cool1'},{'cool':'cool2'}]))
            .attach('uploads[]',__dirname+'/uploads/file1.txt','file1.txt')
            .attach('uploads[]',__dirname+'/uploads/file2.txt','file2.txt')
            .then((result)=>{
                expect(result).to.have.status(200);
            })
            .catch((err)=>{
                console.log('error for /upload: ' + err);
            })
        done();
    })

    it('Returns files from MongoDB', (done) =>{
        chai.request(serverURL).get('/returnfiles' + querystring)
        .then((res)=>{
            console.log(res.body);
            expect(res).to.have.status(200);
        })
        .catch((err)=>{
            console.log('error for /returnFiles: '+err)
        })
        done();
    })

    
})