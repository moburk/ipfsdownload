var express = require('express');
var router = express.Router();
var imageService = require('../services/ipfs.service');
var multer = require('multer');
// var app = express();
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


var storage = multer.diskStorage({
    // destination to temporarily store files on the server
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

var upload = multer({ storage: storage });


module.exports = router;

router.get('/returnFiles', returnFiles);
router.post('/upload',upload.array("uploads[]",12),uploadFiles);
router.delete('/:_id', deleteFile);

function returnFiles(req,res){
    imageService.returnFiles()
        .then(function(hashes){
            res.json(hashes);
        })
        .catch(err =>{
            res.status(400).send(err);
        })
}

function uploadFiles(req,res){
    imageService.uploadFiles(req.files, req.body, req.query)
        .then(()=>{
            console.log('Files successfully uploaded!');
            res.send();        
        })
        .catch(err =>{
            res.status(400).send(err);
        })
}

function deleteFile(req, res){
    imageService.deleteFile(req.params._id, req.query)
        .then(function(){
            res.send('File successfully deleted!')
        })
        .catch(function(err){
            res.status(400).send(err);
        })
}

