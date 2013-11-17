var MinuteDock = require('../minutedock/minutedockApi');
var Q = require('q');
var userRepository = require('../repositories/userRepository');

var formatDate = function(dateAsStringFromServer){
	var dateParts = dateAsStringFromServer.match(/^(.*?)-(.*?)-(.*?)T.*$/);
	return dateParts[3] + "/" + dateParts[2] + "/" + dateParts[1];
};

var createEntryForADate = function(body, date) {
	return {
		contact_id : body.contactId,
		project_id : body.projectId,
		duration : body.duration,
		logged_at : date
	};
};

exports.list = function(req, res){
	var queryParams = {
		'from' : req.query.from,
		'to' : req.query.to,
		'offset' : 0
	}

	userRepository.findUser(req.user.identifier)
	.then(function(user) {
		var md = new MinuteDock(user.apiKey);
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
					userRepository.deleteUsers(req.user.identifier);
					res.send(403);
				}
			});
		};
		fetchEntries([]);
	})
	.fail(function() {
		userRepository.deleteUsers(req.user.identifier);
		res.send(403);
	});

};

exports.bulkAdd = function(req,res) {

	userRepository.findUser(req.user.identifier)
	.then(function(user) {
		var md = new MinuteDock(user.apiKey);
		var allDates = eval(req.body.dates);
		var promises = allDates.map(function(date) {
			return md.entries.new(req.cookies.accountId, createEntryForADate(req.body,date));
		});
		return Q.allSettled(promises);
	})
	.then(function(results) {
		var errorReasons = [];
		results.forEach(function(result) {
			if(result.state != "fulfilled"){
				if(result.reason.status == 403){
					userRepository.deleteUsers(req.user.identifier);
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
	})
	.fail(function() {
		userRepository.deleteUsers(req.user.identifier);
		res.send(403);
	});
};


exports.delete = function(req, res) {
	userRepository.findUser(req.user.identifier)
	.then(function(user) {
		var md = new MinuteDock(user.apiKey);
		return md.entries.delete(req.params.entryId);
	})
	.then(function() {
		res.send(204);
	})
    .fail(function(data) {
		if(!data || data.status === 403){
			userRepository.deleteUsers(req.user.identifier);
			res.send(403);
		}
	});
};
exports.bulkDelete = function(req, res) {
	userRepository.findUser(req.user.identifier)
	.then(function(user) {
		var md = new MinuteDock(user.apiKey);

		var promises = req.body.entryIds.map(function(entryId) {
			return md.entries.delete(entryId);
		});

		return Q.allSettled(promises);
	})
	.then(function(results) {
		var errorReasons = [];
		results.forEach(function(result) {
			if(result.state != "fulfilled"){
				if(result.reason.status == 403){
					userRepository.deleteUsers(req.user.identifier);
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
	})
	.fail(function() {
		userRepository.deleteUsers(req.user.identifier);
		res.send(403);	
	});
};