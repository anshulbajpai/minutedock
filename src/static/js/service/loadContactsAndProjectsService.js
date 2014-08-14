define(['modules/app','service/contactsService','service/projectsService'], function(app){	
	app.service('loadContactsAndProjectsService',['$sessionStorage', '$q', '$route', '$location','contactsService','projectsService',function($sessionStorage, $q, $route, $location, contactsService, projectsService) {
       
        this.refreshContactsProjects = function(location) {
            $q.all([contactsService.getContacts(), projectsService.getProjects()])
            .then(function(result) {
                 $sessionStorage.$default({contacts : result[0].data}); 
                 $sessionStorage.$default({projects : result[1].data});
                 if($location.path() === location){
                    $route.reload();                    
                 } else{
                    $location.path(location);
                 }
            });                    
        };
	}]);
});
