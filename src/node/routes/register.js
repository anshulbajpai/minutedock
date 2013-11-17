var userRepository = require('../repositories/userRepository');
var MinuteDock = require('../minutedock/minutedockApi');

exports.register = function(req,res) {
	var md = new MinuteDock(req.body.apiKey);
	md.accounts.active()
	.then(function(data) {
		userRepository.addUser(req.user.identifier,req.body.apiKey, data.id);
		res.send(204);		
	})
	.fail(function(data) {
		if(data.status == 403){
			res.send(403);
		}
	});
};