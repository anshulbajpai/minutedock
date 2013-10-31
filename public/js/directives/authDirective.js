define(['modules/app'], function(app){	
	app.directive('auth', ['$location','$sessionStorage',function($location,$sessionStorage) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        scope.$on('event:auth-loginRequired', function() {
    			delete $sessionStorage.contacts;
    			delete $sessionStorage.projects;								
    			$location.path("/");
        });
      }
    }
  }]);
});