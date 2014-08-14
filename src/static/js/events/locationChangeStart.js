define(['modules/app','service/loadContactsAndProjectsService'], function(app){	
	app.run(['$rootScope','$sessionStorage', '$location','loadContactsAndProjectsService',function($rootScope, $sessionStorage, $location, loadContactsAndProjectsService) {
       
        var isContactsProjectsRequired = function(location) {
        	return location.indexOf("/entries") > 0 || location.indexOf("/search") > 0
        };

        var contactsProjectsAbsent = function() {
        	return !$sessionStorage.contacts || !$sessionStorage.projects;
        };

        var reloadProjectsContactsIfRequired = function(ev, newLocation, previousLocation) {
            if(contactsProjectsAbsent() && isContactsProjectsRequired(newLocation)){
                ev.preventDefault();
                loadContactsAndProjectsService.refreshContactsProjects($location.path());
            }
        };

        $rootScope.$on('$locationChangeStart', reloadProjectsContactsIfRequired);
	}]);
});
