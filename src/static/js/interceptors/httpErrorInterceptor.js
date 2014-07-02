define(['modules/app'], function(app){	
  app.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push(['$q','$location','$sessionStorage','$window',function($q, $location, $sessionStorage, $window) {        
        return {
            'responseError': function(rejection) {
                if(rejection.status == 403){
                    delete $sessionStorage.contacts;
                    delete $sessionStorage.projects;
                    $location.path("/register");
                }
                else if(rejection.status == 401){
                    $window.location = "/"
                }
                return $q.reject(rejection);
            }
        };
    }]);

  }]);
});