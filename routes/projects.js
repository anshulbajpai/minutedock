var MinuteDock = require('../api/authMinuteDock');
exports.list = function(req, res){
	var md = new MinuteDock(req.cookies.authToken);
	md.projects.all(req.cookies.accountId)
	.then(function(data) {
		var results = data.map(function(project) {
			return {
				id : project.id,
				name : project.name,
				short_code : project.short_code,
				contactId : project.contact_id
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