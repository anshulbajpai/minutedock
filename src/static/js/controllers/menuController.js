define(['angular','modules/app','service/loadContactsAndProjectsService'] , function (angular, app) {

  app.controller('menuController',['$scope','$location','$sessionStorage','loadContactsAndProjectsService', function($scope, $location, $sessionStorage,loadContactsAndProjectsService){  	
	
	this.refreshContactsProjects = function(ev) {
		ev.stopPropagation();
		angular.element(ev.target).parent().parent().parent().removeClass('open');	
		delete $sessionStorage.contacts;
		delete $sessionStorage.projects;
		$scope.openDropDown = false;
		loadContactsAndProjectsService.refreshContactsProjects($location.path());
	};

  }]);

});