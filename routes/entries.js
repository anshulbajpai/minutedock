var MinuteDock = require('../api/authMinuteDock');
var Q = require('q');
var auth = require('./auth');

exports.list = function(req, res){
	var md = new MinuteDock(auth.getApiKey(req.user));
	var queryParams = {
		'from' : req.query.from,
		'to' : req.query.to,
		'offset' : 0
	}
	
	var formatDate = function(dateAsStringFromServer){
		var dateParts = dateAsStringFromServer.match(/^(.*?)-(.*?)-(.*?)T.*$/);
		return dateParts[3] + "/" + dateParts[2] + "/" + dateParts[1];
	};

	var fetchEntries = function(seed) {
		md.entries.search(queryParams)
		.then(function(data) {
			if(data.length == 50){
				queryParams.offset = queryParams.offset + 50;
				fetchEntries(seed.concat(data));
			}else {
				var result = seed.concat(data).map(function(entry){
					return {
						id : entry.id,
						date : formatDate(entry.logged_at),
						contact : entry.contact_id,
						project : entry.project_id,
						duration : entry.duration / 60 / 60
					};
				});
				res.json(result);				
			}
		})
		.fail(function(data) {
			if(data.status == 403){
				res.send(403);
			}
		});
	};

	fetchEntries([]);

};
exports.bulkAdd = function(req,res) {
	var md = new MinuteDock(auth.getApiKey(req.user));

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
	
	
	Q.allSettled(promises)
	.then(function(results) {
		var errorReasons = [];
		results.forEach(function(result) {
			if(result.state != "fulfilled"){
				if(result.reason.status == 403){
					res.send(403);					
				}
				errorReasons.push(result.reason);				
			}
		});
		if(errorReasons.length > 0){
			console.log(errorReasons);
			res.send(400);
		}
		res.send(204);
	});
};


exports.delete = function(req, res) {
	var md = new MinuteDock(auth.getApiKey(req.user));
	md.entries.delete(req.params.entryId).
	then(function() {
		res.send(204);
	})
	.fail(function(data) {
		if(data.status == 403){
			res.send(403);
		}
	});
};
exports.bulkDelete = function(req, res) {
	var md = new MinuteDock(auth.getApiKey(req.user));

	var promises = req.body.entryIds.map(function(entryId) {
		return md.entries.delete(entryId);
	});

	Q.allSettled(promises)
	.then(function(results) {
		var errorReasons = [];
		results.forEach(function(result) {
			if(result.state != "fulfilled"){
				if(result.reason.status == 403){
					res.send(403);					
				}
				errorReasons.push(result.reason);				
			}
		});
		if(errorReasons.length > 0){
			console.log(errorReasons);
			res.send(400);
		}
		res.send(204);
	});
};
