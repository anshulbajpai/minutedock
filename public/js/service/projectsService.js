define(['modules/app'] , function (app) {
  app.service('projectsService',['$http',function($http){

  	this.getProjects = function(callback) {
		$http.get("/projects")
		.success(function(projects, status, headers, config) {
		  	callback.success(projects);
	   	})
		.error(function(data, status, headers, config) {
			
	   	});
  	};
  }]);
});