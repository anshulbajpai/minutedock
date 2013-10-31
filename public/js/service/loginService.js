define(['modules/app'] , function (app) {
  app.service('loginService',['$http',function($http){
    this.getCurrentAccount = function(email,password, callback) {
      $http({
        method : 'GET',
        url : '/accounts/active',
        headers : {'Authorization' : 'Basic ' + btoa(email + ":" + password) }        
      })
      .success(function(data, status, headers, config) {
        callback.success();
      })
      .error(function(data, status, headers, config) {
       callback.error(data) 
      });
    };
  	this.validate = function(callback) {
  		$http({
  			method : 'GET',
  			url : '/accounts/validate',
  		})
      .success(function(data, status, headers, config) {
        callback.success();
      })
		  .error(function(data, status, headers, config) {
			 callback.error(data)	
		  });
  	};
  }]);
});