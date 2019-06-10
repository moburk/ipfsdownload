var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());

const port = '3000';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api',require('./controllers/image.controller'));

app.listen(port, ()=>{
    console.log('Listening to port 3000.');
})