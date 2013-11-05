
/**
 * Module dependencies.
 */
var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var accounts = require('./routes/accounts');
var entries = require('./routes/entries');
var contacts = require('./routes/contacts');
var projects = require('./routes/projects');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/key-cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var path = require('path');

var app = express();

// all environments
app.set('port', 9443);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.compress());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/accounts/active', accounts.active);
app.get('/accounts/validate', accounts.validate);
app.get('/contacts', contacts.list);
app.get('/projects', projects.list);
app.get('/entries', entries.list);
app.post('/entries/bulk/add', entries.bulkAdd);
app.delete('/entries/:entryId', entries.delete);
app.post('/entries/bulk/delete', entries.bulkDelete);

https.createServer(credentials,app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
