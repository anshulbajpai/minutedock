var MinuteDock = require('../api/authMinuteDock');
exports.list = function(req, res){
	var md = new MinuteDock(req.cookies.authToken);
	var data = {
		'from' : req.query.from,
		'to' : req.query.to
	}
	var formatDate = function(date){
		var actualMonth = date.getMonth() + 1;
		return date.getDate() + "/" + actualMonth + "/" + date.getFullYear();
	};
	md.entries.search(data)
	.then(function(data) {
		var result = data.map(function(entry){
			return {
				id : entry.id,
				date : formatDate(new Date(entry.logged_at)),
				contact : entry.contact_id,
				project : entry.project_id,
				duration : entry.duration / 60 / 60
			};
		});
		res.json(result);
	})
	.fail(function(data) {
		if(data.status == 403){
			res.send(401);
		}
	});
};