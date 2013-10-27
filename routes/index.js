var https = require('https');
var querystring = require('querystring');
exports.index = function(req, res){
	res.render('index.html');
};