var MinuteDock = require('../minutedock/minutedockApi');
var userRepository = require('../repositories/userRepository');

exports.list = function(req, res){

	userRepository.findUser(req.user.identifier)
	.then(function(user) {
		var md = new MinuteDock(user.apiKey);
		return md.contacts.all(user.accountId);
	})
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
		if(!data || data.status === 403){
			userRepository.deleteUsers(req.user.identifier);
			res.send(403);
		}
	});
};