const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./api/swagger/ipfs_swagger.json');
//app.use('/api-docs/v1.0', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.use('/api',require('./api/controllers/ipfs.controller'));

app.listen(port, ()=>{
    console.log('Listening to port 3000.');
})