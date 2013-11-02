var MinuteDock = require('../api/authMinuteDock');
var btoa = require('btoa')

exports.active = function(req, res){
	var encodedCredentials = btoa(req.auth.username + ":" + req.auth.password);
	var md = new MinuteDock( encodedCredentials);
	md.accounts.active()
	.then(function(data) {
		res.cookie('accountId',data.id, {secure: true});
		res.cookie('authToken',encodedCredentials,{secure: true});
		res.send(204);		
	})
	.fail(function(data) {
		if(data.status === 403){
			res.send(401);			
		}		
	});
};

exports.validate = function(req, res){
	var md = new MinuteDock(req.cookies.authToken);
	md.accounts.active()
	.then(function(data) {
		if(req.cookies.accountId == data.id){
			res.send(204);		
		}
		else{
			res.send(401);	
		}
	})
	.fail(function(data) {
		if(data.status == 403){
			res.send(401);
		}
	});
};