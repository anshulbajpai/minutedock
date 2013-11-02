var MinuteDock = require('../api/authMinuteDock');
exports.list = function(req, res){
	var md = new MinuteDock(req.cookies.authToken);
	md.contacts.all(req.cookies.accountId)
	.then(function(data) {
		var results = data.map(function(contact) {
			return {
				id : contact.id,
				name : contact.name,
				short_code : contact.short_code	
			};
		});
		res.json(results);
	})
	.fail(function(data) {
		if(data.status == 403){
			res.send(401);
		}
	});
};