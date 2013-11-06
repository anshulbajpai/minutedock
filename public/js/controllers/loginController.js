define(['modules/app','service/loginService','service/contactsService','service/projectsService'] , function (app) {
  app.controller('loginController.login',['$q','$scope', '$location', '$sessionStorage','loginService', 'contactsService', 'projectsService',function($q, $scope, $location, $sessionStorage, loginService, contactsService, projectsService){    
    $scope.login = function(){
      loginService.login($scope.email,$scope.password)
      .then(function(response) {
        return $q.all([contactsService.getContacts(), projectsService.getProjects()]);
      })
      .then(function(result) {
         $sessionStorage.$default({contacts : result[0].data}); 
         $sessionStorage.$default({projects : result[1].data});
         var sendToUrl = $location.search().sendTo;
         if(sendToUrl){
           $location.search('sendTo', null);
           $location.path(sendToUrl); 
         }else {
           $location.path('/entries/current');  
         }
      })
      .then(null, function(result) {
        if(result.status == 401){
          $scope.$root.alert = "Sorry, your credentials didn't match! Please try again.";          
        }
        else{
          $scope.$root.alert = "Sorry, something bad happened! Please try again later.";
        }
        $scope.password = "";
      });
    };

  }])
  .controller('loginController.logout',['$location','$cookies','$sessionStorage',function($location,$cookies, $sessionStorage) {
    delete $cookies.authToken;
    delete $cookies.accountId;
    delete $sessionStorage.contacts;
    delete $sessionStorage.projects;

    $location.path('/login');
  }]);
});