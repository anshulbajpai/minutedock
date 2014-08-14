var http = require('http');
var express = require('express');

var app = express();

app.set('env', process.env.NODE_ENV || "development");
app.set('port', "9444");
app.enable('case sensitive routing');

app.use(express.bodyParser());
app.use(express.compress());

app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
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

var History = function() {
  this.operation = [];
};

History.prototype.push = function(req) {
  this.operation.push({
    path : req.path,
    query : req.query,
    body : req.body
  });
};

History.prototype.read = function() {
  var result = this.operation;
  this.operation = [];
  return result;
};

var listHistory = new History();
var addHistory = new History();
var deleteHistory = new History();

app.get('/accounts/current.json', function(req,res) {
  if(isValidApiKey(req)){
    res.json({id : validAccountId});
    return;
  }
  res.send(403);
});

var contacts = [{id:1,name:"contact1"},{id:2,name:"contact2"}];
var projects = [{id:1,name:"project1", contact_id: 1},{id:2,name:"project2",contact_id : 2}];

var updatedContacts = null;
var updatedProjects = null;

app.get('/contacts.json', function(req,res) {
  if(isValidApiKey(req) && isValidAccountId(req)){
    res.json(updatedContacts || contacts);
    return;
  }
  res.send(403);
});

app.get('/projects.json', function(req,res) {
  if(isValidApiKey(req) && isValidAccountId(req)){
    res.json(updatedProjects || projects);
    return;
  }
  res.send(403);
});

var serverDate = function() {
  var today = new Date();
  var month = (today.getMonth() % 12) + 1;
  return today.getFullYear() + "-" + month + "-" + today.getDate() + "T00:00:00+01:00"; 
};

var entryTemplate = [
    {id:1,contact_id : 1, project_id : 1, duration : 28800},
    {id:2,contact_id : 1, project_id : 1, duration : 28800},
    {id:3,contact_id : 2, project_id : 2, duration : 28800}   
];

var createEntries = function() {
    var entries = entryTemplate.slice(0);
    var today = serverDate();
    entries.forEach(function(entry) {
      entry.logged_at = today;      
    });
    return entries;
};

app.get('/entries.json', function(req,res) {
  listHistory.push(req);
  if(isValidApiKey(req)){
    res.json(createEntries());
    return;
  }
  res.send(403);
});

app.post('/entries.json',function(req, res) {
  addHistory.push(req);
  if(isValidApiKey(req)){
    res.send(200);
    return;
  }
  res.send(403);  
});

app.delete('/entries/:id.:ext',function(req,res) {
  deleteHistory.push(req);
  if(isValidApiKey(req)){
     res.send(200);     
     return;
  }
  res.send(403);  
});

app.post('/contactsprojects', function(req,res) {
  contacts = req.body.contacts;
  projects = req.body.projects;
  res.send(204);
});

app.post('/reset/contactsprojects', function(req,res) {
  updatedProjects = null;
  updatedContacts = null;
  res.send(204);
});

app.get('/history/entries/list', function(req,res) {
  res.json(listHistory.read());
});

app.get('/history/entries/add', function(req,res) {
  res.json(addHistory.read());
});

app.get('/history/entries/delete', function(req,res) {
  res.json(deleteHistory.read());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Minutedock stub server listening on port ' + app.get('port'));
});  
