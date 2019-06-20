var express = require('express');
var router = express.Router();
var imageService = require('../services/image.service');
var multer = require('multer');

var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

var upload = multer({ storage: storage });


module.exports = router;

router.post('/getFile', getFile);
router.get('/dispImg',dispImg);
router.post('/upload',upload.array("uploads[]",12),uploadFiles);
router.delete('/:_id', deleteFile);

function getFile(req,res){
    imageService.getimg(req.body).then(function(){
        res.send();
    })
    .catch(function (err) {
        res.status(400).send(err);
    })
}

function dispImg(req,res){
    imageService.displayimg()
        .then(function(hashes){
            res.json(hashes);
        })
        .catch(err =>{
            res.status(400).send(err);
        })
}

function uploadFiles(req,res){
    console.log(req.files)
    imageService.uploadFiles(req.files)
        .then((files)=>{
            res.json(files);        
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
