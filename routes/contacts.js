var MinuteDock = require('../api/authMinuteDock');
exports.list = function(req, res){
	var md = new MinuteDock(req.cookies.authToken);
	md.contacts.all(req.cookies.accountId, function(err,contacts) {
		if(!err){
			var results = contacts.map(function(contact) {
				return {
					id : contact.id,
					name : contact.name,
					short_code : contact.short_code	
				};
			});
			res.json(results);
		}
	});
};