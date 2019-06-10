var express = require('express');
var router = express.Router();
var imageService = require('../services/image.service');


module.exports = router;

router.post('/getFile', getFile);
router.get('/dispImg',dispImg);

function getFile(req,res){
    imageService.getimg(req.body).then(function(hash){
        res.json(hash);
    })
    .catch(function (err) {
        res.status(400).send(err);
    })
}

function dispImg(req,res){
    imageService.displayimg()
        .then(function(hashes){
            res.send(hashes);
        })
        .catch(err =>{
            res.status(400).send(err);
        })
}