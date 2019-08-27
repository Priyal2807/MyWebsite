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
var webSchema1 = new mongoose.Schema({
  name:String,
  email:String,
  subject:String,
  message:String
});
var webSchema2 = new mongoose.Schema({
  myID:String,
  item:String,
  class:String,
  level:String
});
var myWeb = mongoose.model('myWeb',webSchema);
var myWeb1 = mongoose.model('myWeb1',webSchema1);
var myWeb2 = mongoose.model('myWeb2',webSchema2);
// var itemOne = myWeb2({myID:"ps",item:"HTML and CSS",class:'fas fa-code',level:'skilled'}).save(function(err){
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
  app.post('/contact',urlencodedParser,function(req,res){
    var contactMe = myWeb1(req.body).save(function(err,data){
      if(err) throw err;

      //  res.json(data);
    });
    res.redirect('/');
  });
  app.get('/skill',function(req,res){
    myWeb2.find({myID:'sk'},function(err,data){
      if(err) throw err;
      res.render('skill',{skills:data});
    });
  });
  app.get('/project',function(req,res){
    res.render('project');
  });

  app.get('/cv',function(req,res){
    res.render('cv');
  });
};
