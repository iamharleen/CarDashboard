
var mongodb = require('mongodb');
url='mongodb://admin:admin@c796.candidate.15.mongolayer.com:10796/cmpe280project'
	
var db;
db = new mongodb.Db('cmpe280project', new mongodb.Server('c796.candidate.15.mongolayer.com', 10796, {auto_reconnect:true}), {});


function createGraph(callback, name)
{ 
	db = new mongodb.Db('cmpe280project', new mongodb.Server('c796.candidate.15.mongolayer.com', 10796, {auto_reconnect:true}), {});

	db.open(function(err, p_client) {
	
	db.authenticate('admin', 'admin', function(err) {
		if (err) console.log(err);
		else{
			var collection1 = new mongodb.Collection(db, name);
			var results = [];
			collection1.aggregate(
					   [
					     { $group: { _id: "$drive", total_products: { $sum: 1 } } }
					   ],function(err,result) {
						   callback(err,result);
						});
	   }   
  });
});
}


exports.createGraph = createGraph;