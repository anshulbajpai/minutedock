define(['modules/app'] , function (app) {

  app.controller('logoutDirectiveController',['$scope','$cookies',function($scope, $cookies){  	
    $scope.$watch(function() {
       if($cookies.authToken){
        $scope.isLoggedIn = true;
       } 
       else {
        $scope.isLoggedIn = false;
       }
    });
  }]);

});