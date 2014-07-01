define(['modules/app','models/addEntriesModel','service/entriesService'] , function (app,AddEntriesModel) {

  app.controller('addEntriesController',['$scope','$routeParams','$sessionStorage','$rootScope','entriesService', function($scope, $routeParams, $sessionStorage,$rootScope,entriesService){  	

    var model = new AddEntriesModel($sessionStorage.contacts, $sessionStorage.projects,$routeParams.month,$routeParams.year);
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

    this.addEntries = function() {
      var self = this;
      entriesService.addBulkEntries(model.selectedContact, model.selectedProject,model.duration, model.selectedDates)
      .then(function() {
        model.selectedDates = [];
        model.allWeekdaysSelected = false;
        $rootScope.alerts.success = "Entries added successfully!"     
        $scope.$emit('parent.refresh.entries');
      });
    };

  }]);

});