
/**
 * Module dependencies.
 */

var express = require('express')
 // , routes = require('./routes')
  , database = require('./routes/database')
  , pie = require('./routes/piegraph')
  , http = require('http')
  , ejs = require("ejs")
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
/*
app.get('/index', function(req, res){
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});*/

var title = 'Car Dashboard Design';
var output1 = '';
var output2 = '';
var output3 = '';

//get
app.get('/index', function(req, res){
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});


app.get('/graph1', function (req, res) {
	database.createGraph(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile('./views/graph1.ejs',
					{title : title, output1 : results},	//sending results to user
					function(err, result) {
				// render on success
				if (!err) {
					console.log("sss=" + JSON.stringify(results));
					console.log("value=" + results[0].total_products);
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

app.get('/piegraph/:car', function(req, res, results) {
	var car = req.params.car;
	var name = "";
	var file = './views/pieAcura.ejs';
	
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
					console.log("value=" + results[0][0]);
					console.log("value2=" + results[0][1]);
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
