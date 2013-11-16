define(['modules/app'] , function (app) {
  app.service('registrationService',['$http',function($http){
    
    this.register = function(apiKey) {
      return $http.post('/register',{'apiKey' : apiKey});
    };

  }]);
});