var MinuteDock = require('../api/authMinuteDock');
var btoa = require('btoa')
exports.active = function(req, res){
	var encodedCredentials = btoa(req.auth.username + ":" + req.auth.password);
	var md = new MinuteDock( encodedCredentials);
	md.accounts.active(function(err, account) {
		if(!err){			
			res.cookie('accountId',account.id);
			res.cookie('authToken',encodedCredentials);
			res.send();		
		}
	});
};