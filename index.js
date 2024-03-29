var express = require('express');
var webController = require('./controllers/website-controller.js');
var app = express();
const config = require('config');

let appPort = process.env.PORT || config.get('app.port');
//setting up a template engine
app.set('view engine','ejs');

//setting up static files
app.use(express.static('./public'));

webController(app);

app.listen(appPort);
console.log(`u are listening to port ${appPort}`);
