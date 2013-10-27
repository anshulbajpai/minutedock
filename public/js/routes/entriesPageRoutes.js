define(['modules/app','controllers/entriesController'], function(app){
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/entries/current',{
			controller : 'entriesController.current',
			templateUrl : 'partials/entries.html'	
		})
		.when('/entries/:month/:year',{
			controller : 'entriesController.month.year',
			templateUrl : 'partials/entries.html'	
		});
	}]);
});