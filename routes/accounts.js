var MinuteDock = require('minutedock');
exports.active = function(req, res){
	var md = new MinuteDock(req.params.apiKey);
	md.accounts.active(function(err, account) {
		res.json(account);		
	});
};