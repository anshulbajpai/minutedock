define(['modules/app'], function(app){	
  app.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push(['$q','$injector',function($q, $injector) {        
        var $rootScope;
        var pendingRequests = 0;
        
        $rootScope = $rootScope || $injector.get('$rootScope');
        
        var requestReceived = function() {
            ++ pendingRequests;
            if(pendingRequests === 1){
                $rootScope.ajaxLoader = true;                    
            }            
        };

        var responseReceived = function() {
            -- pendingRequests;
            if(pendingRequests === 0){
                $rootScope.ajaxLoader = false;                    
            }            
        };

        return {
           'request': function(config) {
                requestReceived();
                return config || $q.when(config);
            },
            'response': function(response) {
                responseReceived();
                return response || $q.when(response);
            },
            'responseError': function(rejection) {
                responseReceived();
                return $q.reject(rejection);
            }
        };

    }]);

  }]);

});