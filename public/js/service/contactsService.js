define(['modules/app'] , function (app) {
  app.service('contactsService',['$http',function($http){

  	this.getContacts = function(callback) {
		$http.get("/contacts")
		.success(function(contacts, status, headers, config) {
		  	callback.success(contacts);
	   	})
		.error(function(data, status, headers, config) {
	   	
	   	});
  	};

  }]);
});