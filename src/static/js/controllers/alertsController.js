define(['modules/app'] , function (app) {

  app.controller('alertsController',['$rootScope',function($rootScope){  	
    $rootScope.alerts = {};

    this.dismissSuccess = function() {
		$rootScope.alerts.success = null;    	
    };

    this.dismissFalure = function() {
		$rootScope.alerts.failure = null;    	
    };

  }]);

});