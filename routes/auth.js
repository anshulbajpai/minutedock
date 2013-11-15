var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var uuid = require('node-uuid');

var authTokenToIdentifier = {};

var identifierToApiKey = {};

passport.use(new GoogleStrategy(
	{
	    returnURL: 'https://localhost:9443/auth/callback',
    	realm: 'https://localhost:9443/'
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
	var apiKey = identifierToApiKey[req.user];
	if(apiKey){
		res.redirect('/#/');
	}
	else{
		res.redirect('/#/register')
	}
};

exports.registerApiKey = function(identifier, apiKey, accountId) {
  identifierToApiKey[identifier] = {apiKey : apiKey, accountId : accountId}
};

exports.getApiKey = function(identifier) {
  return identifierToApiKey[identifier].apiKey;
};

exports.getAccountId = function(identifier) {
  return identifierToApiKey[identifier].accountId;
};

