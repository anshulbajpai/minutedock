define(['modules/app'], function(app){	
  app.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push(['$q','$injector','$location','$sessionStorage',function($q, $injector, $location, $sessionStorage) {        
        
        return {
            'responseError': function(rejection) {
                if(rejection.status == 401){
                    delete $sessionStorage.contacts;
                    delete $sessionStorage.projects;
                    var sendToUrl = $location.url()
                    if($location.url() != "/" && $location.url() != "/login") {
                        $location.search('sendTo', sendToUrl);
                    }
                    $location.path("/login");
                }
                return $q.reject(rejection);
            }
        };
    }]);

  }]);
});