define(['modules/app'] , function (app) {

  app.controller('alertsController',['$rootScope',function($rootScope){  	
    $rootScope.alerts = {};
  }]);

});