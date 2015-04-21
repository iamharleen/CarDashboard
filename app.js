
/**
 * Module dependencies.
 */

var express = require('express')
 // , routes = require('./routes')
  , bar = require('./routes/barGraph')
  , bubble = require('./routes/bubbleGraph')
  , modelBar = require('./routes/modelBarGraph')
  , pie = require('./routes/piegraph')
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
app.get('/index', function(req, res){
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

var title = 'Car Dashboard Design';
var output1 = '';
var output2 = '';
var output3 = '';

//get
/*
app.get('/index', function(req, res){
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});*/

//get
app.get('/mercedes', function(req, res){
  fs.readFile(__dirname + '/public/mercedes.ejs', 'utf8', function(err, text){
        res.send(text);
    });
});


app.get('/barGraph', function (req, res) {
	console.log("ofddd");
	bar.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile('./views/barGraph.ejs',
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
	}, "test");
});


app.get('/modelBarGraph/:car', function (req, res) {
	var car = req.params.car;
	var name = "";
	var file = './views/modelBarGraph.ejs';
	
	if(car=="bmw") {
		name = "bmw2015Collection";
	}	
	else if(car=="audi"){
		name = "audi2015Collection";
	}	
	else if(car=="mercedes"){
		name = "mercedes2015Collection";
	}	
	modelBar.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile('./views/modelBarGraph.ejs',
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


app.get('/bubbleGraph', function (req, res) {
	var name = "";
	var file = './views/bubbleGraph.ejs';
	var bmw = [];
	var audi = [];
	var merc = [];
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
									{title : title, bmw : bmw, audi: audi, merc : merc},	//sending results to user
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


app.get('/piegraph/:car', function(req, res, results) {
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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
