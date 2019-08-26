var express = require('express');
var webController = require('./controllers/website-controller.js');
var app = express();
//setting up a template engine
app.set('view engine','ejs');

//setting up static files
app.use(express.static('./public'));

webController(app);

app.listen(3000);
console.log('u are listening to port 3000');
