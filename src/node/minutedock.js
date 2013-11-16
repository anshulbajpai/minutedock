
/**
 * Module dependencies.
 */
var fs = require('fs');
var express = require('express');
var app = express();
var https = require('https');
var path = require('path');

var routes = require('./routes');

var auth = require('./routes/auth');
var register = require('./routes/register');
var entries = require('./routes/entries');
var contacts = require('./routes/contacts');
var projects = require('./routes/projects');
var passport = require('passport');

var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/key-cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

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

// TODO configure cookie secret
app.use(express.cookieSession({ secret: 'some secret', cookie: {secure: true, httpOnly : true}}));

app.use(express.static(path.join(__dirname, '../static')));
app.use(passport.initialize()); // needs to be before app.router
app.use(passport.session());

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(app.router);

app.use(function(err, req, res, next){
	if(err === "minutedock_user_not_found"){
		res.send(403);
	}
	else{
		console.error(err.stack);
		res.send(500, 'Something broke!');
	}
});


function requireLogin(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};


app.all(/^\/[^login|^auth]*$/, requireLogin, function(req, res, next) {
  next(); 
});

app.get('/login', auth.login);
app.get('/logout', auth.logout);

app.get('/auth/login', auth.authLogin);
app.get('/auth/callback', auth.callback);
app.get('/auth/checkApiKey', auth.checkApiKey);

app.post('/register', register.register);

app.get('/',routes.index);

app.get('/contacts', contacts.list);

app.get('/projects', projects.list);

app.get('/entries', entries.list);
app.post('/entries/bulk/add', entries.bulkAdd);
app.delete('/entries/:entryId', entries.delete);
app.post('/entries/bulk/delete', entries.bulkDelete);



https.createServer(credentials,app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
