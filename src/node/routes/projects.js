var MinuteDock = require('../minutedock/minutedockApi');
var userRepository = require('../repositories/userRepository');

exports.list = function(req, res){

	userRepository.findUser(req.user.identifier)
	.then(function(user) {
		var md = new MinuteDock(user.apiKey);
		return md.projects.all(user.accountId);
	})
	.then(function(data) {
		var results = data.map(function(project) {
			return {
				id : project.id,
				name : project.name,
				contactId : project.contact_id
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