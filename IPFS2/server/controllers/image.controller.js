var express = require('express');
var router = express.Router();
var imageService = require('../services/image.service');
var multer = require('multer');


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
            res.send();        
        })
        .catch(err =>{
            res.status(400).send(err);
        })
}

function deleteFile(req, res){
    imageService.deleteFile(req.params._id)
        .then(function(){
            res.json('success')
        })
        .catch(function(err){
            res.status(400).send(err);
        })
}

