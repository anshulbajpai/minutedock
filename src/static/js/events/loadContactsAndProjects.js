define(['modules/app','service/contactsService','service/projectsService'], function(app){	
	app.run(['$rootScope','$sessionStorage', '$q', '$route','contactsService','projectsService',function($rootScope, $sessionStorage, $q, $route,contactsService, projectsService) {
       
        var isContactsProjectsRequired = function(location) {
        	return location.indexOf("/entries") > 0 || location.indexOf("/search") > 0
        };

        var contactsProjectsAbsent = function() {
        	return !$sessionStorage.contacts || !$sessionStorage.projects;
        };

    	$rootScope.$on('$locationChangeStart', function(ev, newLocation, previousLocation) {
            if(contactsProjectsAbsent() && isContactsProjectsRequired(newLocation)){
        	    ev.preventDefault();
				$q.all([contactsService.getContacts(), projectsService.getProjects()])
		      	.then(function(result) {
					 $sessionStorage.$default({contacts : result[0].data}); 
					 $sessionStorage.$default({projects : result[1].data});
                     $route.reload();
			    });
        	}
    	});

	}]);
});
