
var mongodb = require('mongodb');
url='mongodb://admin:admin@c796.candidate.15.mongolayer.com:10796/cmpe280project'
	
var db;
db = new mongodb.Db('cmpe280project', new mongodb.Server('c796.candidate.15.mongolayer.com', 10796, {auto_reconnect:true}), {});


function createGraph(callback, model)
{ 
//The 10056 is the port!
db = new mongodb.Db('cmpe280project', new mongodb.Server('c796.candidate.15.mongolayer.com', 10796, {auto_reconnect:true}), {});

db.open(function(err, p_client) {
	
  //Notice the USERNAME and PASSWORD!
  db.authenticate('admin', 'admin', function(err) {
   //Change error handler when going into production 
   if (err) console.log(err);
   else{
	   var collection1 = new mongodb.Collection(db, 'cardetails');
	   var results = [];
       
    	collection1.findOne({"make": "Toyota"}, function (err, user) {
        var model = user.model;
        results.push([2007, model]);        
   
        collection1.findOne({"make": "Acura"}, function (err, user) {
    	var model = user.model;
        results.push([2008, model]);        
    
        collection1.findOne({"make": "Audi"}, function (err, user) {
    	var model = user.model;
        results.push([2009, model]);         
  
        collection1.findOne({"make": "Chevrolet"}, function (err, user) {
    	var model = user.model;
        results.push([2011, model]);        
    
        collection1.findOne({"make": "BMW"}, function (err, user) {
    	var model = user.model;
        results.push([2012, model]);              
        callback(err,results);
        });
        });
        });});});
	   }   
  });
});
}


exports.createGraph = createGraph;