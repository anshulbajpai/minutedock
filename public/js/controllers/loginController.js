define(['modules/app','service/loginService','service/contactsService','service/projectsService'] , function (app) {
  app.controller('loginController.login',['$scope', '$location', '$sessionStorage','loginService', 'contactsService', 'projectsService',function($scope, $location, $sessionStorage, loginService, contactsService, projectsService){
    loginService.validate({
      success : function() {
        $location.path('/entries/current'); 
      },
      error : function() {

      }
    });
    
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
app.controller('loginController.logout',['$location','$cookies',function($location,$cookies) {
  delete $cookies.authToken;
  delete $cookies.accountId;
  $location.path('/');
}]);
});