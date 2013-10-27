define(['modules/app'] , function (app) {
  app.service('loginService',['$http',function($http){
  	this.getCurrentAccount = function(appKey, callback) {
  		$http.get("/"+ appKey + "/accounts/active")
		.success(function(account, status, headers, config) {
			callback.success(account)
		})
		.error(function(data, status, headers, config) {
			callback.error(data)	
		});
  	};
  }]);
});