define(['modules/app','models/searchModel','service/searchService',''] , function (app, SearchModel) {

  app.controller('searchController',['$scope', '$rootScope','$sessionStorage' ,'searchService',function($scope, $rootScope, $sessionStorage, searchService){  	
	$rootScope.alerts = {};
	var model = new SearchModel($sessionStorage.contacts,$sessionStorage.projects);	
	$scope.model = model;
	
    this.selectProject = function(selectedProjectName) {
      model.selectProject(selectedProjectName);
    };

    this.projectNameChanged = function() {
      if(model.selectedProject && model.typedProjectName !== model.selectedProject.name){
        model.selectedContact = null;        
        model.selectedProject = null;        
      }
    };

    var createEntryFromResponse = function(entry) {
      return {
        id : entry.id,
        date : entry.date, 
        contact : entry.contact ? $sessionStorage.contacts.filter(function(c){return c.id == entry.contact})[0].name : "",
        project : entry.project ? $sessionStorage.projects.filter(function(p){return p.id == entry.project})[0].name : "",
        duration : entry.duration
      };
    };


  	this.search = function() {
  		searchService.searchEntries(model.selectedProject, model.selectedContact, model.fromDate, model.toDate)
  		.then(function(response) {
  			model.searchResults = createEntryFromResponse(response.data);
  		});
  	};

  }]);

});