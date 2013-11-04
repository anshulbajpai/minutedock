define(['modules/app','service/redirectService','controllers/entriesController'], function(app){
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/entries/current',{
			resolve : {redirect : 'redirect.currentEntries'}	
		})
		.when('/entries/:month/:year',{
			controller : 'entriesController.month.year',
			templateUrl : 'partials/entries.html'	
		});
	}]);
});