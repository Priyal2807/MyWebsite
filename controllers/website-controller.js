var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
}); //this is a piece of middleware which handles the post data for the post handler
var mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


const conn = mongoose.createConnection('mongodb://localhost/myWebsite');
//init gfs
let gfs;
conn.once('open', function() {
  //init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

//creating storage engine
const storage = new GridFsStorage({
  url: 'mongodb://localhost/myWebsite',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({
  storage
});

//creating a schema - this is like a blueprint
var webSchema = new mongoose.Schema({
  myID: String,
  item: String
});
var webSchema1 = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});
var webSchema2 = new mongoose.Schema({
  myID: String,
  item: String,
  class: String,
  level: String
});
var myWeb = conn.model('myWeb', webSchema);
var myWeb1 = conn.model('myWeb1', webSchema1);
var myWeb2 = conn.model('myWeb2', webSchema2);
// var itemOne = myWeb2({myID:"ps",item:"HTML and CSS",class:'fas fa-code',level:'skilled'}).save(function(err){
//   if(err) throw err;
//   console.log("Item Saveed");
// });

module.exports = function(app) {
  app.get('/', function(req, res) {
    myWeb.find({
      $or: [{
        myID: "ps1"
      }, {
        myID: "ps"
      }]
    }, function(err, data) {
      if (err) throw err;
      res.render('home', {
        myPs: data
      }); //this data comes from find method
    });
  });
  app.get('/contact', function(req, res) {
    res.render('contact');
  });

  //here we have /contact because on the form page we did not specify any
  //action tag and by default it is the same page for action
  //if we change the action tag then the same value should also go in app.post
  app.post('/contact', urlencodedParser, function(req, res) {
    var contactMe = myWeb1(req.body).save(function(err, data) {
      if (err) throw err;

      //  res.json(data);
    });
    res.redirect('/');
  });
  app.get('/skill', function(req, res) {
    myWeb2.find({
      myID: 'sk'
    }, function(err, data) {
      if (err) throw err;
      res.render('skill', {
        skills: data
      });
    });
  });
  app.get('/project', function(req, res) {
    res.render('project');
  });

  app.get('/cv', function(req, res) {
    res.render('cv');
  });


  //route POST /uploads
  //uploads file to DB
  app.post('/upload', upload.single('resume'), function(req, res) {
    res.json({
      file: req.file
    });
  });
};