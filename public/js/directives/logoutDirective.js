define(['modules/app','controllers/logoutDirectiveController'], function(app){	
  app.directive('logout',[function() {
    return {
        restrict : 'E',
        templateUrl : 'views/partials/logout.html',
        controller : 'logoutDirectiveController'
    };
  }]);
});