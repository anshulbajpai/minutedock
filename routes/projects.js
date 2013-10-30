var MinuteDock = require('../api/authMinuteDock');
exports.list = function(req, res){
	var md = new MinuteDock(req.cookies.authToken);
	md.projects.all(req.cookies.accountId, function(err,projects) {
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