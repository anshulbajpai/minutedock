define(['modules/app'], function(app){	
	var isEmpty = function(value) {
		return value === undefined || value === null;
	};

	app.directive('auth',['$rootScope', '$location','$cookieStore','$sessionStorage',function($rootScope, $location, $cookieStore, $sessionStorage){
		return {
			restrict : 'A',
			link : function() {
				$rootScope.$on('$routeChangeStart', function(event, toRoute, fromRoute) {
					if(toRoute.$$route.free === undefined || toRoute.$$route.free === false){
						var apiKey = $cookieStore.get('apiKey');
						var accountId = $cookieStore.get('accountId');
						var contacts = $sessionStorage.contacts;
						var projects = $sessionStorage.projects;
						if(isEmpty(apiKey) || isEmpty(accountId) || isEmpty(contacts) || isEmpty(projects)){
							event.preventDefault(); // currently does nothing. route still invoked.
							$location.path("/");
						}
					}
				});
			}
		}
	}]);
});