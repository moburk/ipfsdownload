var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
//var multer = require('multer');


//app.use(fileUpload());

app.use(cors());

const port = '3000';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// specify the folder
app.use(express.static(path.join(__dirname, 'uploads')));
// headers and content type
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*app.post("/api/upload", multer({dest: "./uploads/"}).array("uploads", 12), function(req, res) {
    res.send(req.files);
});*/

app.use('/api',require('./controllers/image.controller'));

app.listen(port, ()=>{
    console.log('Listening to port 3000.');
})