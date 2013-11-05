define(['modules/app','service/redirectService','controllers/entriesController'], function(app){
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/entries/current',{
			resolve : {redirect : ['redirectService',function(redirectService) {
				redirectService.currentEntries();
			}]}	
		})
		.when('/entries/:month/:year',{
			controller : 'entriesController.month.year',
			templateUrl : 'partials/viewEntries.html'	
		})
		.when('/entries/add',{
			controller : 'entriesController.add',
			templateUrl : 'partials/addEntries.html'	
		});
	}]);
});