var MinuteDock = require('../api/authMinuteDock');
var Q = require('q');
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
exports.bulkAdd = function(req,res) {
	var md = new MinuteDock(req.cookies.authToken);

	var createEntryForADate = function(body, date) {
		return {
			contact_id : body.contactId,
			project_id : body.projectId,
			duration : body.duration,
			logged_at : date
		};
	};

	var allDates = eval(req.body.dates);
	var promises = allDates.map(function(date) {
		return md.entries.new(req.cookies.accountId, createEntryForADate(req.body,date));
	});
	
	var errorReasons = [];
	Q.allSettled(promises)
	.then(function(results) {
		results.forEach(function(result) {
			if(result.state != "fulfilled"){
				errorReasons.push(result.reason);				
			}
		})
	});
	if(errorReasons){
		console.log(errorReasons);
		res.send(400);
	}
	res.send(204);
};