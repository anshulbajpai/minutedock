define(['modules/app','service/loginService','service/contactsService','service/projectsService'] , function (app) {
  app.controller('loginController',['$scope', '$cookieStore', '$location', '$sessionStorage','loginService', 'contactsService', 'projectsService',function($scope, $cookieStore, $location, $sessionStorage, loginService, contactsService, projectsService){
    $scope.login = function(){
      loginService.getCurrentAccount($scope.apiKey, {
        success : function(account) {
          $cookieStore.put('apiKey',$scope.apiKey);
          $cookieStore.put('accountId',account.id);
          contactsService.getContacts($scope.apiKey,account.id,{
            success : function(contacts) {
               $sessionStorage.$default({
                contacts : contacts
               }); 
            },
            error : function() {}
          });          
          projectsService.getProjects($scope.apiKey,account.id,{
            success : function(projects) {
               $sessionStorage.$default({
                projects : projects
               }); 
            },
            error : function() {}
          });          
          $location.path('/entries/current');  
        },
        error : function() {}        
      });
    };
  }]);
});