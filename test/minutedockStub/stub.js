var http = require('http');
var express = require('express');

var app = express();

app.set('env', process.env.NODE_ENV || "development");
app.set('port', "9444");
app.enable('case sensitive routing');

app.use(express.bodyParser());
app.use(express.compress());

// express logger used after static path binding so that it does not logs static files
app.use(express.logger('dev'));  

app.use(app.router);

app.use(function(err, req, res, next){
  console.error(err);
  res.send(500);
});

var validApiKey = "valid_api_key";
var validAccountId = "valid_account_id"

var isValidApiKey = function(req) {
	return req.query.api_key === validApiKey || req.body.api_key === validApiKey;
};

var isValidAccountId = function(req) {
	return req.query.account_id === validAccountId || req.body.account_id === validAccountId;
};

app.get('/accounts/current.json', function(req,res) {
  if(isValidApiKey(req)){
    res.json({id : validAccountId});
  }
  res.send(403);
});

app.get('/contacts.json', function(req,res) {
  if(isValidApiKey(req) && isValidAccountId(req)){
    res.json([{id:"1",name:"contact1"},{id:"2",name:"contact2"}]);
  }
  res.send(403);
});

app.get('/projects.json', function(req,res) {
  if(isValidApiKey(req) && isValidAccountId(req)){
    res.json([{id:"1",name:"project1", contact_id: 1},{id:"2",name:"project2",contact_id : 2}]);
  }
  res.send(403);
});

app.get('/entries.json', function(req,res) {
  if(isValidApiKey(req)){
    var today = new Date();
    var date = today.getFullYear() + "-" + ((today.getMonth()%12)+1) + "-" + today.getDate() + "T00:00:00+01:00";
    res.json([
    	{id:1,contact_id : 1, project_id : 1, duration : 28800, logged_at : date},
    	{id:2,contact_id : 1, project_id : 1, duration : 28800, logged_at : date},
    	{id:3,contact_id : 2, project_id : 2, duration : 28800, logged_at : date}		
    ]);
  }
  res.send(403);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Minutedock stub server listening on port ' + app.get('port'));
});  
