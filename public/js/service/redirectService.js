define(['modules/app','service/contactsService','service/projectsService'] , function (app) {
  app.service('redirectService',['$location', '$sessionStorage', '$q','contactsService','projectsService',function($location, $sessionStorage, $q ,contactsService, projectsService){
    
    this.currentEntries = function() {
      var today = new Date();
      var month=today.getMonth() + 1;
      var year=today.getFullYear();
      $location.path('/entries/'+ month + "/" + year);      
    }; 

    this.loadProjectsAndContacts = function() {
    	$q.all([contactsService.getContacts(), projectsService.getProjects()])
      	.then(function(result) {
			 $sessionStorage.$default({contacts : result[0].data}); 
			 $sessionStorage.$default({projects : result[1].data});
			 $location.path('/entries/current')
			 // var sendToUrl = $location.search().sendTo;
			 // if(sendToUrl){
			 //   $location.search('sendTo', null);
			 //   $location.path(sendToUrl); 
			 // }else {
			 //   $location.path('/entries/current');  
			 // }         
        });
    };
  }])

});