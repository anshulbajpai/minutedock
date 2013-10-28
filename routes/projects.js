var MinuteDock = require('minutedock');
exports.list = function(req, res){
	var md = new MinuteDock(req.params.apiKey);
	md.projects.all(req.params.accountId, function(err,projects) {
		if(!err){
			var results = projects.map(function(project) {
				return {
					id : project.id,
					name : project.name,
					short_code : project.short_code,
					contactId : project.contact_id
				};
			});
			res.json(results);
		}
	});
};