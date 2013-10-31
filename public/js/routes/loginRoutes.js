define(['modules/app','controllers/loginController'], function(app){
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/',{
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