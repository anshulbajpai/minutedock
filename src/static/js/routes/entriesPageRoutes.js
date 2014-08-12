define(['modules/app','service/redirectService','controllers/entriesController'], function(app){
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/entries/current',{
			resolve : {redirect : ['redirectService',function(redirectService) {
				redirectService.loadCurrentEntries();
			}]}	
		})
		.when('/entries/:month/:year',{
			controller : 'entriesController',
			templateUrl : 'views/entries.html'	
		});
	}]);
});