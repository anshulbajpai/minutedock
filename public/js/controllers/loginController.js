define(['modules/app','service/loginService'] , function (app) {
  app.controller('loginController',['$scope', '$cookieStore', '$location', 'loginService',function($scope, $cookieStore, $location, loginService){
  	$scope.apiKey = '3173914527f00f2d2d223fb8e11d4e8d';
    $scope.login = function(){
      loginService.getCurrentAccount($scope.apiKey, {
        success : function(account) {
          $cookieStore.put('apiKey',$scope.apiKey);
          $cookieStore.put('accountId',account.id);
          $location.path('/entries/current');  
        },
        error : function() {}        
      });
    };
  }]);
});