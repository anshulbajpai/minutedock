define(['modules/app','controllers/registrationController'], function(app){
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/register',{
			controller : 'registrationController',
			templateUrl : 'views/register.html'
		});
	}]);
});