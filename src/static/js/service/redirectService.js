define(['modules/app','service/contactsService','service/projectsService'] , function (app) {
  app.service('redirectService',['$location', '$sessionStorage', '$q','contactsService','projectsService',function($location, $sessionStorage, $q ,contactsService, projectsService){
    
    this.loadCurrentEntries = function() {
      var today = new Date();
      var month=today.getMonth() + 1;
      var year=today.getFullYear();
      $location.path('/entries/'+ month + "/" + year);      
    }; 
    
  }]);
});