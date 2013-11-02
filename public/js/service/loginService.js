define(['modules/app'] , function (app) {
  app.service('loginService',['$http',function($http){
    
    this.login = function(email,password) {
      return $http({
        method : 'GET',
        url : '/accounts/active',
        headers : {'Authorization' : 'Basic ' + btoa(email + ":" + password) }        
      });
    };
  	
    this.validateLogin = function() {
  		return $http.get('/accounts/validate');
  	};

  }]);
});