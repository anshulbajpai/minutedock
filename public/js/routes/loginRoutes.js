define(['modules/app','controllers/loginController'], function(app){
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/',{
			controller : 'loginController',
			templateUrl : 'partials/login.html',
			free : true	
		})
		.otherwise({ redirectTo: '/' });
	}]);
});