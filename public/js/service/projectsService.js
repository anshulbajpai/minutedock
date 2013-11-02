define(['modules/app'] , function (app) {
  app.service('projectsService',['$http',function($http){

  	this.getProjects = function(callback) {
		return $http.get("/projects");
  	};
  	
  }]);
});