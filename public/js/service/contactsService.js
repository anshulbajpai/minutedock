define(['modules/app'] , function (app) {
  app.service('contactsService',['$http',function($http){

  	this.getContacts = function(callback) {
		return $http.get("/contacts");
  	};

  }]);
});