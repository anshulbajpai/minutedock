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

    var createEntriesFromResponse = function(entries) {
      return entries.map(createEntryFromResponse);        
    };

    var createEntryFromResponse = function(entry) {
      return {
        date : entry.date, 
        duration : entry.duration
      };
    };

  	this.search = function() {
  		searchService.searchEntries(model.selectedProject, model.fromDate, model.toDate)
  		.then(function(response) {
  			model.searchResults = createEntriesFromResponse(response.data);
  		});
  	};

  }]);

});