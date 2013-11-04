define(['modules/app','service/redirectService','controllers/loginController'], function(app){
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/',{
			resolve : {redirect : 'redirect.validateLogin'}
		})
		.when('/login',{
			controller : 'loginController.login',
			templateUrl : 'partials/login.html'
		})
		.when('/logout',{
			controller : 'loginController.logout',
			templateUrl : 'partials/login.html'
		})
		.otherwise({ redirectTo: '/' });
	}]);
});