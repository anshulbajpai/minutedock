var auth = require('./auth')
var MinuteDock = require('../api/authMinuteDock');

exports.register = function(req,res) {
	var md = new MinuteDock(req.body.apiKey);
	md.accounts.active()
	.then(function(data) {
		auth.registerApiKey(req.user,req.body.apiKey, data.id);
		res.send(204);		
	})
	.fail(function(data) {
		if(data.status == 403){
			res.send(403);
		}
	});
};