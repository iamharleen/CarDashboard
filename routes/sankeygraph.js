
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
	   var collection1 = new mongodb.Collection(db, 'audi2015Collection');
	   var collection2 = new mongodb.Collection(db, 'mercedes2015Collection');
	   var collection3 = new mongodb.Collection(db, 'bmw2015Collection');
	   var results = [];
	   
	   collection1.aggregate(
				   [
				     { $group: { _id: "$fuelType", total_products: { $sum: 1 } } }
				   ],function(err,result) {
					   results.push(result); 
					   
					   collection2.aggregate(
							   [
							     { $group: { _id: "$fuelType", total_products: { $sum: 1 } } }
							   ],function(err,result) {
								   results.push(result); 
								   
								   collection3.aggregate(
										   [
										     { $group: { _id: "$fuelType", total_products: { $sum: 1 } } }
										   ],function(err,result) {
											   results.push(result); 
											   	callback(err,results);
										   });
							   });
				   });
       
    	
	   }   
  });
});
}


exports.createGraph = createGraph;