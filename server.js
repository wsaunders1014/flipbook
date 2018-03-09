var express = require('express');
var bodyParser = require('body-parser');
var expressStaticGzip = require("express-static-gzip");
const fileUpload = require('express-fileupload');

var ExifImage = require('exif').ExifImage;
const fs = require('fs');
var ejs =require('ejs');
var path = require('path');
var Promise = require('promise');

var http = require('http');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var cors = require('cors')
var app = express();

var request = require('request');
var cookieParser = require('cookie-parser')
var browser = require('browser-detect');
var rimraf = require('rimraf');

var uid = require('uid-safe').sync;
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
var Store =  new FileStore({retries:1})

app.use(['/','/*.html','/*.php'], session({genid: function(req) {
	//console.log(req.body)
	//console.log('query:',req.query, req.body)
	if(req.query.session_token)
		return req.query.session_token;
	else if(req.body.session_token){
		return req.body.session_token;
	}else{
		return uid(24);// use UUIDs for session IDs 
	}
  },saveUninitialized:false,resave:false, store: Store,secret:'stg'}));

app.get('/', function(req,res){
	//Detects Mobile
	var result = browser(req.headers['user-agent']);
	req.session.mobile = (result.mobile) ? true:false;

	fs.readFile('dist/index.php','utf-8', function(err,content){
		res.set('Content-Type','text/html');
		//Passes req.session variables into html to be read by javascript. Example: {data:req.session.data}
		var rendered = ejs.render(content, {isMobile:req.session.mobile});
		res.end(rendered);
	});
	
})


app.use(express.static(__dirname+'/dist'));
app.use(fileUpload());

//Handle /upload functionality
app.post('/upload', function(req,res){
	console.log('Request received');
	//Check for file in request. Send to 404 if absent.
	if (!req.files)
     	return res.status(400).send({message:'No files were uploaded.'});

});
//GET DATA FROM SESSION
app.get('/sessions/:id',function(req,res){
	fs.readFile('sessions/'+req.params.id+'.json', function(err, content){
		
		if(content)
			res.status(200).send(content);
		else
			res.status(404).send({})
	});
})


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
  	console.log(err)
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});
// app.use(enforce.HTTPS());
//Serve HTTPS https.createServer(https_options,app).listen(8443,function(){
// 	console.log('Listenening on 8443 too!')
// });requests
// 
http.createServer(app).listen(8000, function(){
	console.log('App listening on port 8000!');
});
// http.createServer(app).listen(8000, function(){
// 	console.log('Listening on 8000');
// })
