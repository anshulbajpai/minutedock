define(['modules/app'] , function (app) {
  app.service('searchService',['$http',function($http){

  	this.getContacts = function(callback) {
		return $http.get("/search");
  	};

  }]);
});