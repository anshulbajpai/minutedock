var MinuteDock = require('../api/authMinuteDock');
var auth = require('./auth');

exports.list = function(req, res){
	var md = new MinuteDock(auth.getApiKey(req.user));
	md.contacts.all(auth.getAccountId(req.user))
	.then(function(data) {
		var results = data.map(function(contact) {
			return {
				id : contact.id,
				name : contact.name
			};
		});
		res.json(results);
	})
	.fail(function(data) {
		if(data.status == 403){
			res.send(403);
		}
	});
};