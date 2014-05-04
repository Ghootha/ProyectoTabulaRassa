// Simple server with connection to mongodb:/teams
// Modules
var http = require('http');
var url= require('url');
var fs = require('fs');
var pm = require('path');
var qs = require('querystring');
// Server parameters
var port = 8080;
// Controller pahts
var path_teams= '/teams',
    path_update='/update',
	path_default='/',
    default_page='make_post.html';
// Opens connection
var mongoTeams; // handler for mongodb 
try{
   // Simple Server serving db teams
   mongoTeams = require('./queryTeamsFromMongoDB2.js');
   
} catch(e){
   // Por ejemplo si la DB no esta disponible
   console.log(e);
   mongoTeams ={};
};
// Controller handlers
function handleInvalidPath(req, res, options){
        var status=500, 
		    msg='Invalid Path Requested';
		if(options){
           res.statusCode = options["status"] || status;
		   msg = options["msg"] || msg;
		};
        res.setHeader('content-type', 'text/html');
		res.write('<!doctype html>');
		res.write('<head><title>Server error</title></head>');
		res.write('<h1 style="font-size:3em;color:red;text-decoration:underline overline">'+msg+':'+req.url+'</h1>');
		res.write('<a href="mailto:ignore@gmail.com">Report</a>');
		res.end();
};
var nteams=0;
var the_teams;
function teams(req, res){
   console.log("teams again:"+nteams++);
// Setup mongo Teams
	mongoTeams.res=res; 
	mongoTeams.req=req;
	mongoTeams.error=null;
	mongoTeams.handler=mongoTeams;
	// done will be called back when query is complete (async)
	mongoTeams.done = function(){
        the_teams=mongoTeams.getTeams();
		console.log("db done "+nteams);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({results:the_teams}));
        res.end();
	};
	
	mongoTeams.errorHandler = function(){
		handleInvalidPath(req, res, {status:200, msg:'Teams Server Error'});
		return;
    };
    mongoTeams.db();	
};
function updateTeams(req, res){
    console.log("updateTeams method:"+req.method);
    var requestBody="";
    req.on('data', function(data) {
      requestBody += data; // Ojo esto debe verificar un ataque por archivo infinito 
    });
	
    req.on('end', function() {
	    console.log("updateTeams received this data:"+requestBody);
		var parsedData={};
		/*
		 Experado es un JSON así:
		 {"criteria":{"id":"XXXX"},"set":{"$set":FFFF}}
		 XXXX objectID string
		 FFFF object con los campos y valores a cambiar
		 Ejemplo:
		 {"criteria":{"id":"5314dbd8aeb77a831f6d8901"},"set":{"$set":{"won":28}}}
		 Request desde curl
		 curl -X POST -H "Content-Type: application/json" -d @post.json http://localhost:8080/update

		*/
		try{
	       parsedData = JSON.parse(requestBody);
		   parsedData.ok = true;
		   //Hacemos el request a mongodb
		   mongoTeams.update({_id:mongoTeams.ObjectID(parsedData.criteria.id)},
		                     // Posible BUG mongodb no acepta {$set:parsedData.set}, 
							 parsedData.set,      //Asi si esta funcionando
							 function(e, result){ //callback 
							    console.log("updateTeams callback:"+e+" "+result);
							    if(e){
								  throw(e);
								};
								parsedData.mongoResult=result;
								console.log("updateTeams:"+JSON.stringify(parsedData));
	                            res.statusCode = 200;
	                            res.setHeader('content-type', 'application/json');
		                        res.write(JSON.stringify(parsedData));
		                        res.end();
							 }
           );							 
		   
		}catch(e){
		   parsedData.ok = e.toString();
		   res.statusCode = 500;
	       res.setHeader('content-type', 'application/json');
		   res.write(JSON.stringify(parsedData));
		   res.end();
		};
	    
	});
};
function post(req, res){
   fs.readFile(default_page, function(err, file) {
            if(err){
			  handleInvalidPath(req, res);
			  return;
			};
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(file.toString())
            res.end()
     });
};
function handleFileToServe(path, req, res){
   path=path.substring(1, path.length);
   console.log("Trying to serve "+__dirname+path);
   var type=null, enc="utf8";
   if(htmlReg.test(path)){
      type='text/html';
   }else if(cssReg.test(path)){
      type='text/css';
   }else if(jsReg.test(path)){
      type='text/javascript';
   }else if(pdfReg.test(path)){
      type='application/pdf';
   }else if(pngReg.test(path)){
      type='image/png';
	  enc=null;
   }else if(jpgReg.test(path)){
      enc=null;
      type='image/jpg';
   }else{
      handleInvalidPath(req, res, {status:400, msg:'Invalid type'});
	  return;
   };
   console.log("type ="+type);
   var filename=pm.join(__dirname, path);
   console.log("getting "+filename);
   var file;
   try{
     if(enc)
       file=fs.readFileSync(filename, enc); //DEBERIA SER ASYNC 
     else
      file=fs.readFileSync(filename);
   }catch(e){
      console.log(e);
      handleInvalidPath(req, res, {status:400, msg:'Not found'});
	  return;
   };
   console.log("file was read");
   res.writeHead(200, {'Content-Type': type});
   res.write(file);
   res.end();
   return;
   
};
// Accepted types
var files_to_serve_regex = /^.*\.(html|pdf|css|png|jpg|js)$/;
var htmlReg =/^.*\.(htm|html)$/;
var cssReg =/^.*\.css$/;
var jsReg =/^.*\.js$/;
var pdfReg =/^.*\.pdf$/;
var pngReg =/^.*\.png$/;
var jpgReg =/^.*\.jpg$/;

// create and start server
http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	console.log("REQUESTED URL:"+urlObj.pathname);
	switch(urlObj.pathname){
	  case path_teams: teams(req, res);return;
	  case path_update: updateTeams(req, res); return;
	  case path_default: post(req, res);return;
	  default: if (files_to_serve_regex.test(urlObj.pathname))
	              handleFileToServe(urlObj.pathname, req, res)  
	           else handleInvalidPath(req, res);return;
	};
    
}).listen(port);
console.log('Mini Teams Third World is server running');
