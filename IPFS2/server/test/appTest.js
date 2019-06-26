const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const chaiHttp = require('chai-http');
const fs = require('fs');
let server = require('../app');

chai.use(chaiHttp);
var agent = chai.request.agent(server);



describe('Tests for app.js', function(){
    console.log('Testing');

    it('Upload files along with form data', (done)=>{
        chai.request('http://localhost:3000/api').post('/upload')
            .type('form')
            .field('fileInformation',JSON.stringify([{'cool':'cool1'}]))
            .attach('uploads[]','/home/burk/Documents/ipfsdownload/IPFS2/server/test/uploads/file1.txt','file1.txt')
            .then((result)=>{
                expect(result).to.have.status(200);
            })
            .catch((err)=>{
                expect(err).to.have.status(400);
            })
            done();
    })
})