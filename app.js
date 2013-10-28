
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var accounts = require('./routes/accounts');
var entries = require('./routes/entries');
var contacts = require('./routes/contacts');
var projects = require('./routes/projects');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.compress());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/:apiKey/accounts/active', accounts.active);
app.get('/:apiKey/entries', entries.list);
app.get('/:apiKey/:accountId/contacts', contacts.list);
app.get('/:apiKey/:accountId/projects', projects.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
