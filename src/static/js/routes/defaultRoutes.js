define(['modules/app','service/redirectService'], function(app){
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/',{ redirectTo : '/entries/current'})
		.otherwise({ redirectTo: '/' })
	}]);
});