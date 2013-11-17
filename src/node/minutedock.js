var fs = require('fs');
var express = require('express');
var https = require('https');
var path = require('path');
var passport = require('passport');
var ejs = require('ejs');

var config = require('./config.json');

var index = require('./routes/index');
var auth = require('./routes/auth');
var register = require('./routes/register');
var entries = require('./routes/entries');
var contacts = require('./routes/contacts');
var projects = require('./routes/projects');

var privateKey  = fs.readFileSync(config["ssl.key.path"], 'utf8');
var certificate = fs.readFileSync(config["ssl.cert.path"], 'utf8');
var credentials = { key: privateKey, cert: certificate };

var app = express();

app.set('env', config["environment"]);
app.set('port', config["https.port"]);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.enable('case sensitive routing');
app.enable('view cache');

app.engine('html', ejs.renderFile);


app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.compress());
app.use(express.cookieSession({ secret: config["session.cookie.secret"], cookie: {secure: true, httpOnly : true}}));
app.use(express.static(path.join(__dirname, '../static')));

// express logger used after static path binding so that it does not logs static files
app.configure('development', function() {
  app.use(express.logger('dev'));
});

app.configure('production', function() {
  var requestLogStream = fs.createWriteStream('./logs/requests.log', {flags : 'a'});
  app.use(express.logger({stream : requestLogStream}));
});

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

app.use(function(err, req, res, next){
  console.error(err);
	res.send(500);
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

app.get('/',index.index);

app.post('/register', register.register);

app.get('/contacts', contacts.list);

app.get('/projects', projects.list);

app.get('/entries', entries.list);
app.post('/entries/bulk/add', entries.bulkAdd);
app.delete('/entries/:entryId', entries.delete);
app.post('/entries/bulk/delete', entries.bulkDelete);

https.createServer(credentials,app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});