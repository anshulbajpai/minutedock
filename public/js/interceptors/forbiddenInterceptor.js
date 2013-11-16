define(['modules/app'], function(app){	
  app.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push(['$q','$location','$sessionStorage',function($q, $location, $sessionStorage) {        
        return {
            'responseError': function(rejection) {
                if(rejection.status == 403){
                    delete $sessionStorage.contacts;
                    delete $sessionStorage.projects;
                    $location.path("/register");
                }
                return $q.reject(rejection);
            }
        };
    }]);

  }]);
});