var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var uuid = require('node-uuid');

var config = require('../config.json');

var authTokenToIdentifier = {};

var identifierToUser = {};

passport.use(new GoogleStrategy(
	{
	    returnURL: 'https://localhost:' + config["https.port"] + '/auth/callback',
    	realm: 'https://localhost:' + config["https.port"] + '/'
  	},
  	function(identifier, profile, done) {
  		var authToken = uuid.v4();
  		var id = identifier.match(/^.*?id=(.*?)$/)[1];
  		authTokenToIdentifier[authToken] = id;
  		done(null, authToken);	
  	}
));

passport.serializeUser(function(authToken, done) {
  done(null, authToken);
});

passport.deserializeUser(function(authToken, done) {
  var identifier = authTokenToIdentifier[authToken];
  if(!identifier){
  	done(null, false, 'User session expired');
  }
  else{
  	done(null, identifier);
  }
});

exports.login = function(req,res) {
	res.render('login.html');
};

exports.logout = function(req,res) {
  req.logout();
  res.redirect('/');
};

exports.authLogin = passport.authenticate('google');

exports.callback = passport.authenticate('google', { successRedirect: '/auth/checkApiKey',
                                    failureRedirect: '/login' });

exports.checkApiKey = function(req,res) {
	var user = identifierToUser[req.user];
	if(user){
		res.redirect('/#/');
	}
	else{
		res.redirect('/#/register')
	}
};

exports.registerApiKey = function(identifier, apiKey, accountId) {
  identifierToUser[identifier] = {apiKey : apiKey, accountId : accountId}
};

exports.getApiKey = function(identifier) {
  var user = identifierToUser[identifier];
  if(user){
    return identifierToUser[identifier].apiKey;
  }
  else{
    throw 'minutedock_user_not_found';
  }
};

exports.getAccountId = function(identifier) {
  var user = identifierToUser[identifier];
  if(user){
    return identifierToUser[identifier].accountId;
  }
  else{
    throw 'minutedock_user_not_found';
  }
};

