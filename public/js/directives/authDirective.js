define(['modules/app'], function(app){	
	var isEmpty = function(value) {
		return value === undefined || value === null;
	};

	app.directive('auth',['$rootScope', '$location','$cookies','$sessionStorage',function($rootScope, $location, $cookies, $sessionStorage){
		return {
			restrict : 'A',
			link : function() {
				$rootScope.$on('$routeChangeStart', function(event, toRoute, fromRoute) {
					if(toRoute.$$route) {
						if(toRoute.$$route.free === undefined || toRoute.$$route.free === false){
							if(!$cookies.authToken || !$cookies.accountId){
								event.preventDefault(); // currently does nothing. route still invoked.
								delete $sessionStorage.contacts;
								delete $sessionStorage.projects;								
								$location.path("/");
							}
						}						
					}
				});
			}
		}
	}]);
});