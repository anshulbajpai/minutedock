var MinuteDock = require('../minutedock/minutedockApi');
var auth = require('./auth');

exports.list = function(req, res){
	var md = new MinuteDock(auth.getApiKey(req.user));
	md.projects.all(auth.getAccountId(req.user))
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
		if(data.status == 403){
			res.send(403);
		}
	});
};