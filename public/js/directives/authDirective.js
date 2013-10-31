define(['modules/app'], function(app){	
	app.directive('authDemoApplication', ['$location','$sessionStorage',function($location,$sessionStorage) {
    return {
      restrict: 'C',
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