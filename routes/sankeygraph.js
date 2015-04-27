
var mongodb = require('mongodb');
url='mongodb://admin:admin@c796.candidate.15.mongolayer.com:10796/cmpe280project'
	
var db;
db = new mongodb.Db('cmpe280project', new mongodb.Server('c796.candidate.15.mongolayer.com', 10796, {auto_reconnect:true}), {});

function createGraph(callback, name)
{ 
//The 10796 is the port!
db = new mongodb.Db('cmpe280project', new mongodb.Server('c796.candidate.15.mongolayer.com', 10796, {auto_reconnect:true}), {});

db.open(function(err, p_client) {
	
  //Notice the USERNAME and PASSWORD!
  db.authenticate('admin', 'admin', function(err) {
   //Change error handler when going into production 
   if (err) console.log(err);
   else{
       var collection1 = new mongodb.Collection(db, name);
       var results2011 = [];
       var results2012 = [];
       var results2013 = [];
       var results2014 = [];
       var results2015 = [];
       // Get All drive type for year 2011 to 2015
	   collection1.aggregate(
				    [
                           /*{
                               $match: {
                               $and: [ 
                                      {year: 2011}, 
                                      {drive: "Rear-Wheel Drive"}
                                  ]
                                }
                           }, */
                           {$match : {year : 2011}},
                           { $group: { _id: "$drive", total_products: { $sum: 1 } } }
                        
                    ],function(err,result) {
                       results2011.push(result); 
                       console.log(results2011);
					   // Get All drive type for year 2012
					   collection1.aggregate(
							   [
                                   {$match : {year : 2012}},
                                   { $group: { _id: "$drive", total_products: { $sum: 1 } } }
                                   
                               ],function(err,result) {
                                   results2012.push(result); 
								   //console.log(results2012);
                                   // Get All drive type for year 2013
								   collection1.aggregate(
										   [
										     {$match : {year : 2013}},
                                             { $group: { _id: "$drive", total_products: { $sum: 1 } } }
                                               
										   ],function(err,result) {
											   results2013.push(result);
                                               //console.log(results2013);
                                              // Get All drive type for year 2014
                                               collection1.aggregate(
                                               [
                                                 {$match : {year : 2014}},
                                                 { $group: { _id: "$drive", total_products: { $sum: 1 } } }
                                                   
                                               ],function(err,result) {
                                                   results2014.push(result);
                                                   //console.log(results2014);
                                                   // Get All drive type for year 2015
                                                   collection1.aggregate(
                                                   [
                                                     {$match : {year : 2015}},
                                                     { $group: { _id: "$drive", total_products: { $sum: 1 } } }
                                                       
                                                   ],function(err,result) {
                                                       
                                                       results2015.push(result);
                                                       //console.log(results2015);
                                                       callback(err,results2011, results2012, results2013, results2014, results2015);

                                                    }); 
                                                   
                                               });
                                               
										   });
							   });
				   });
	       }   
        });
    });
}

exports.createGraph = createGraph;
