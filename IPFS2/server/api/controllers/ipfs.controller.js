const express = require('express');
const router = express.Router();
const imageService = require('../services/ipfs.service');
const multer = require('multer');

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
router.delete('/delete/:_id', deleteFile);
router.put('/updateFile/:_id',upload.single("file"), updateFile);

function returnFiles(req,res){
    imageService.returnFiles(req.query)
        .then(function(files){
            res.status(200).json(files);
        })
        .catch(err =>{
            res.status(400).send(err);
        })
}

function uploadFiles(req,res){
    imageService.uploadFiles(req.files, req.body, req.query)
        .then(()=>{
            //console.log('Files successfully uploaded!');
            res.status(200).send('Files successfully uploaded!');        
        })
        .catch(err =>{
            res.status(400).send(err);
        })
}

function deleteFile(req, res){
    imageService.deleteFile(req.params._id, req.query)
        .then(function(){
            res.status(200).send('File successfully deleted!')
        })
        .catch(function(err){
            res.status(400).send(err);
        })
}

function updateFile(req, res){
    imageService.updateFile(req.file, req.body, req.query, req.params._id)
        .then(function(){
            res.status(200).send('File successfully updated!')
        })
        .catch(function(err){
            res.status(400).send(err);
        })
}