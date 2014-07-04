var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var uuid = require('node-uuid');

var config = require('konfig')();
var authTokenRepository = require('../repositories/authTokenRepository');
var userRepository = require('../repositories/userRepository');

passport.use(new GoogleStrategy(
	{
      clientID: config.app["google.auth.client.id"],
      clientSecret: config.app["google.auth.client.secret"],
      callbackURL: config.app["oauth.callback.base.url"] + 'auth/callback'
  	},
  	function(accessToken, refreshToken, profile, done) {
  		var authToken = uuid.v4();
  		var id = profile.id;
      authTokenRepository.addAuthToken(authToken, id);
  		done(null, authToken);	
  	}
));

passport.serializeUser(function(authToken, done) {
  done(null, authToken);
});

passport.deserializeUser(function(authToken, done) {
  authTokenRepository.findIdentifier(authToken)
  .then(function(identifier) {
    done(null, {authToken : authToken, identifier:identifier});
  })
  .fail(function() {
    done(null, {});  
  });
});

exports.login = function(req,res) {
	res.render('login.html');
};

exports.logout = function(req,res) {
  authTokenRepository.removeAuthToken(req.user.authToken);
  req.logout();  
  res.redirect('/');
};

exports.authLogin = passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/userinfo.profile'] });

exports.callback = passport.authenticate('google', { successRedirect: '/auth/checkApiKey',
                                    failureRedirect: '/login' });

exports.checkApiKey = function(req,res) {
	userRepository.findUser(req.user.identifier)
  .then(function(user) {
    res.redirect('/#/');
  })
  .fail(function() {
    res.redirect('/#/register')
  });
};