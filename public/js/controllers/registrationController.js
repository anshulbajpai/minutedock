define(['modules/app','service/registrationService','service/contactsService','service/projectsService'] , function (app) {

  app.controller('registrationController',['$scope', '$rootScope', '$location','$q','$sessionStorage' , 'registrationService','contactsService','projectsService',function($scope, $rootScope, $location, $q, $sessionStorage ,registrationService, contactsService, projectsService){  	
	$rootScope.alerts = {};
	
	$scope.register = function() {
		registrationService.register($scope.apiKey)
		.then(function(response) {
        	 return $q.all([contactsService.getContacts(), projectsService.getProjects()]);
      	})
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

  }]);

});