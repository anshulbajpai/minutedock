var MinuteDock = require('../api/authMinuteDock');
var btoa = require('btoa')
exports.active = function(req, res){
	var encodedCredentials = btoa(req.auth.username + ":" + req.auth.password);
	var md = new MinuteDock( encodedCredentials);
	md.accounts.active(function(err, data) {		
		if(!err){			
			res.cookie('accountId',data.id, {secure: true, httpOnly : true});
			res.cookie('authToken',encodedCredentials,{secure: true, httpOnly : true});
			res.send();		
		}
		else if(data.status == 403){
			res.status(401);
			res.send();
		}
	});
};
exports.validate = function(req, res){
	var md = new MinuteDock(req.cookies.authToken);
	md.accounts.active(function(err, data) {		
		if(!err){			
			if(req.cookies.accountId == data.id){
				res.send();		
			}
			else{
				res.send(401);	
			}
		}
		else if(data.status == 403){
			res.send(401);
		}
	});
};