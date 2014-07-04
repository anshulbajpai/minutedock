define(['modules/app','service/searchService'] , function (app) {

  app.controller('searchController',['$scope', '$rootScope', 'searchService',function($scope, $rootScope, $location, searchService){  	
	$rootScope.alerts = {};
	
	// $scope.register = function() {
	// 	registrationService.register($scope.apiKey)
	// 	.then(function(response) {
 //        	 return $q.all([contactsService.getContacts(), projectsService.getProjects()]);
 //      	})
 //      	.then(function(result) {
	// 		 $sessionStorage.$default({contacts : result[0].data}); 
	// 		 $sessionStorage.$default({projects : result[1].data});
	// 		 $location.path('/entries/current')
 //        });
	// };

  }]);

});