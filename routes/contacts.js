var MinuteDock = require('minutedock');
exports.list = function(req, res){
	var md = new MinuteDock(req.params.apiKey);
	md.contacts.all(req.params.accountId, function(err,contacts) {
		var results = contacts.map(function(contact) {
			return {
				id : contact.id,
				name : contact.name,
				short_code : contact.short_code	
			};
		});
		res.json(results);
	});
};