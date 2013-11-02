define(['modules/app','service/loginService','service/contactsService','service/projectsService'] , function (app) {
  app.controller('loginController.login',['$q','$scope', '$location', '$sessionStorage','loginService', 'contactsService', 'projectsService',function($q, $scope, $location, $sessionStorage, loginService, contactsService, projectsService){
    
    loginService.validateLogin().then(function() {
      $location.path('/entries/current'); 
    });
    
    $scope.login = function(){
      loginService.login($scope.email,$scope.password)
      .then(function() {
        return $q.all([contactsService.getContacts(), projectsService.getProjects()]);
      })
      .then(function(result) {
           $sessionStorage.$default({contacts : result[0].data}); 
           $sessionStorage.$default({projects : result[1].data});
           $location.path('/entries/current');  
      });
    };

  }]);

  app.controller('loginController.logout',['$location','$cookies',function($location,$cookies) {
    delete $cookies.authToken;
    delete $cookies.accountId;
    $location.path('/');
  }]);
});