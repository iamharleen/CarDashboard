
/**
 * Module dependencies.
 */

var express = require('express')
 // , routes = require('./routes')
  , bar = require('./routes/barGraph')
  , bubble = require('./routes/bubbleGraph')
  , modelBar = require('./routes/modelBarGraph')
  , pie = require('./routes/piegraph')
  , sankey = require('./routes/sankeygraph')
  , http = require('http')
  , ejs = require("ejs")
  , fs = require('fs')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//get
app.get('/', function(req, res){
  ejs.renderFile('./views/index.html',function(err, result) {
	  console.log("yoddle");
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
  
});

var title = 'Car Dashboard Design';
var output1 = '';
var output2 = '';
var output3 = '';


//get
app.get('/mercedes', function(req, res){ 
  ejs.renderFile('./views/mercedes.ejs',function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});

app.get('/bmw', function(req, res){
	 ejs.renderFile('./views/bmw.ejs',function(err, result) {
			// render on success
			if (!err) {
				res.end(result);
			}
			// render or error
			else {
				res.end('An error occurred');
				console.log(err);
			}
		});
});

app.get('/audi', function(req, res){
	ejs.renderFile('./views/audi.ejs',function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});

app.get('/:car/barGraph', function (req, res) {
	var car = req.params.car;
	var file = "/../images/mercedes.jpg";
	
    console.log(car);
	if(car=="bmw") {
		file = "/../images/bmw.jpg";
	}	
	else if(car=="audi"){
		file = "/../images/audi.jpg";
	}	
	else if(car=="mercedes"){
		file = "/../images/mercedes.jpg";
	}	
	bar.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile('./views/barGraph.ejs',
					{title : title, output1 : results, output2 : file},	//sending results to user
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	}, "test");
});


app.get('/:car/modelBarGraph', function (req, res) {
	var car = req.params.car;
	console.log("name of " + car);
	var name = "";
	var file = "/../images/mercedes.jpg";
	var carName = 'Mercedes';
	
    console.log(car);
	if(car=="bmw") {
		name = "bmw2015Collection";
		file = "/../images/bmw.jpg";
		carName = 'BMW';
	}	
	else if(car=="audi"){
		name = "audi2015Collection";
		file = "/../images/audi.jpg";
		carName = 'Audi';
	}	
	else if(car=="mercedes"){
		name = "mercedes2015Collection";
		file = "/../images/mercedes.jpg";
		carName = 'Mercedes';
	}	
	modelBar.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile('./views/modelBarGraph.ejs',
					{title : title, output1 : results, output2 : file, output3 : carName},	//sending results to user
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	}, name);
});


app.get('/:car/bubbleGraph', function (req, res) {
	var car = req.params.car;
	var name = "";
	var file = "/../images/mercedes.jpg";
	var bmw = [];
	var audi = [];
	var merc = [];
	if(car=="bmw") {
		file = "/../images/bmw.jpg";
	}	
	else if(car=="audi"){
		file = "/../images/audi.jpg";
	}	
	else if(car=="mercedes"){
		file = "/../images/mercedes.jpg";
	}	
	bubble.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			merc = results;
			bubble.createGraph(function(err,results){
				if(err){
					throw err;
				}else{
					audi = results;
					bubble.createGraph(function(err,results){
						if(err){
							throw err;
						}else{
							bmw = results;
							ejs.renderFile('./views/bubbleGraph.ejs',
									{title : title, bmw : bmw, audi: audi, merc : merc, output2 : file},	//sending results to user
									function(err, result) {
								// render on success
								if (!err) {
									res.end(result);
								}
								// render or error
								else {
									res.end('An error occurred');
									console.log(err);
								}
							});
						}
					}, "bmwCollection");
				}
				},"audiCollection");
		}
	}, "mercedesCollection");
});


app.get('/:car/piegraph', function(req, res, results) {
	var car = req.params.car;
	var name = "";
	var file = './views/pieMerc.ejs';
	
	if(car=="bmw") {
		name = "bmwCollection";
		file = './views/pieBmw.ejs'
	}	
	else if(car=="audi"){
		name = "audiCollection";
		file = './views/pieAudi.ejs'
	}	
	else if(car=="mercedes"){
		name = "mercedesCollection";
		file = './views/pieMerc.ejs'
	}		
	pie.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile(file,
					{title : title, output1 : results},	//sending results to user
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	}, name);
});

app.get('/:car/sankeygraph', function(req, res, results) {
	var car = req.params.car;
	var name = "";
	var file = './views/sankeyMerc.ejs';
	
	if(car=="bmw") {
		name = "bmwCollection";
		file = './views/sankeyBmw.ejs'
	}	
	else if(car=="audi"){
		name = "audiCollection";
		file = './views/sankeyAudi.ejs'
	}	
	else if(car=="mercedes"){
		name = "mercedesCollection";
		file = './views/sankeyMerc.ejs'
	}		
    
    // TO be removed later
    var title = "Car Dashboard Design";
    var results = [10,20,30];
    
	pie.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile(file,
					{title : title, output1 : results},	//sending results to user
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	}, name);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
