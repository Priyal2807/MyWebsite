const bodyParser = require('body-parser');
const config = require('config');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
//const uri = config.get('db.url');
const uri = process.env.MONGODB_URI;
const conn = mongoose.createConnection(uri);

/* start of code used to upload the resume */
let gfs;
conn.once('open', function() {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

//creating storage engine
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
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

/* end of code used to upload the resume */

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
  level: String
});
var myWeb = conn.model('myWeb', webSchema); //for the home page
var myWeb1 = conn.model('myWeb1', webSchema1); //for the contact page
var myWeb2 = conn.model('myWeb2', webSchema2); //for the skills page
 //var itemOne = myWeb2({
 //  myID: "ps",
 //    item: "HTML and CSS",
 //  level: "skilled"
 //}).save(function(err) {
 // if (err) throw err;
 // console.log("Item Saveed");
 //});

// home page
module.exports = function(app) {
  app.get('/', function(req, res) {
    myWeb.find({
      $or: [{
        myID: "ps1"
      }, {
        myID: "ps"
      }]
    }, function (err, data) {
        if (err) throw err;
   
      res.render('home', {
        myPs: data
      }); 
    });
  });

//contact page
  app.get('/contact', function(req, res) {
    res.render('contact');
  });

//submit contact page
  app.post('/contact', urlencodedParser, function(req, res) {
    var contactMe = myWeb1(req.body).save(function(err, data) {
      if (err) throw err;
    });
    res.redirect('/');
  });

//skill page
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


//cv page to upload my resume
  app.post('/upload', upload.single('resume'), function(req, res) {
    res.json({
      file: req.file
    });
  });

//download page
  app.get('/download/:name', (req, res) => {
    gfs.collection('uploads');
    var fname = req.params.name;
    //console.log(fname);

    gfs.files.find({
      filename: fname
    }).toArray(function(err, files) {
      if (!files || files.length === 0) {
        return res.status(404).json({
          responseCode: 1,
          responseMessage: "error"
        });
      }
      res.set('Content-Type', files[0].contentType);
      res.set('Content-Disposition', 'attachment; filename="' + files[0].filename + '"');


      var readstream = gfs.createReadStream({
        filename: fname,
        root: "uploads"
      });

      readstream.on("error", function(err) {
        res.end();
      });

      return readstream.pipe(res);
    });
  });


};