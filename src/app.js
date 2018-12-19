const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

//Initializations
const app = express();
const router = require('./routes/index')
const viewsURL = path.join(__dirname, 'views');
const assetsURL = path.join(__dirname, 'assets');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', viewsURL);

//Middlewares
app.use(express.static(assetsURL));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use('/', router);

//Start server
app.listen(app.get('port'), () => {
  console.log('Working')
});