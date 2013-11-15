define(['modules/app','service/redirectService'], function(app){
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/',{
			resolve : {redirect : ['redirectService',function(redirectService) {
				redirectService.loadProjectsAndContacts();
			}]}	
		})
		.otherwise({ redirectTo: '/' })
	}]);
});