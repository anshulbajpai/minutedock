define(['modules/app','service/redirectService','controllers/loginController'], function(app){
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/',{
			resolve : {redirect : ['redirectService',function(redirectService) {
				redirectService.validateLogin();
			}]}
		})
		.when('/login',{
			controller : 'loginController.login',
			templateUrl : 'views/login.html'
		})
		.when('/logout',{
			controller : 'loginController.logout',
			templateUrl : 'views/login.html'
		})
		.otherwise({ redirectTo: '/' });
	}]);
});