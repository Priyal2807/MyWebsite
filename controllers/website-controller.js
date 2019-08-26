var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //this is a piece of middleware which handles the post data for the post handler
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myWebsite', function (err) { // if the db does not exist it will create the database

   if (err) throw err;

   console.log('Successfully connected');

});

//creating a schema - this is like a blueprint
var webSchema = new mongoose.Schema({
  myID:String,
  item:String
});


var myWeb = mongoose.model('myWeb',webSchema);
// var itemOne = myWeb({myID:"ps",item:"With my knack for coding"}).save(function(err){
//   if(err) throw err;
//   console.log("Item Saveed");
// });

module.exports = function(app){
  app.get('/',function(req,res){
    myWeb.find({$or: [
         {myID: "ps1"}, {myID:"ps"}
      ]},function(err,data){
      if(err) throw err;
        res.render('home',{myPs:data});  //this data comes from find method
    });
  });
  app.get('/contact',function(req,res){
    res.render('contact');
  });
  app.get('/skill',function(req,res){
    res.render('skill');
  });
  app.get('/project',function(req,res){
    res.render('project');
  });

  app.get('/cv',function(req,res){
    res.render('cv');
  });
};
