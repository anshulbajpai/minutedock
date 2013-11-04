define(['modules/app'], function(app){	
  app.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push(['$q','$injector',function($q, $injector) {        
        var $rootScope;
        return {
           'request': function(config) {
                $rootScope = $rootScope || $injector.get('$rootScope');
                $rootScope.alert = null;
                $rootScope.ajaxLoader = true;
                return config || $q.when(config);
            },
            'response': function(response) {
                $rootScope = $rootScope || $injector.get('$rootScope');
                $rootScope.ajaxLoader = false;
                return response || $q.when(response);
            },
            'responseError': function(rejection) {
                $rootScope = $rootScope || $injector.get('$rootScope');
                $rootScope.ajaxLoader = false;
                return $q.reject(rejection);
            }
        };
    }]);
  }]);
});