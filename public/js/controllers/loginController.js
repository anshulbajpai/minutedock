define(['modules/app','service/loginService','service/contactsService','service/projectsService'] , function (app) {
  app.controller('loginController',['$scope', '$cookies', '$location', '$sessionStorage','loginService', 'contactsService', 'projectsService',function($scope, $cookies, $location, $sessionStorage, loginService, contactsService, projectsService){
    
    if($cookies.authToken && $cookies.accountId){
      $location.path('/entries/current'); 
    }

    $scope.login = function(){
      loginService.getCurrentAccount($scope.email,$scope.password, {
        success : function() {
          contactsService.getContacts({
            success : function(contacts) {
               $sessionStorage.$default({contacts : contacts}); 
               projectsService.getProjects({
                success : function(projects) {
                   $sessionStorage.$default({projects : projects}); 
                   $location.path('/entries/current');  
                },
                error : function() {}
              });   
            },
            error : function() {}
          });                           
        },
        error : function() {}        
      });
    };
  }]);
});