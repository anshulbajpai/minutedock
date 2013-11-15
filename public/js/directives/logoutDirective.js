define(['modules/app'], function(app){	
  app.directive('logout',[function() {
    return {
        restrict : 'E',
        templateUrl : 'views/partials/logout.html'
    };
  }]);
});