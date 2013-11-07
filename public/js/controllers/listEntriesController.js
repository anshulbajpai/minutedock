define(['modules/app','models/listEntriesModel','service/entriesService'] , function (app,ListEntriesModel) {

  app.controller('listEntriesController',['$scope','$routeParams','$sessionStorage','$rootScope','entriesService', function($scope, $routeParams, $sessionStorage,$rootScope,entriesService){  	

    var model = new ListEntriesModel();
    $scope.model = model;

    var createEntryFromResponse = function(entry) {
      return {
        id : entry.id,
        date : entry.date, 
        contact : entry.contact ? $sessionStorage.contacts.filter(function(c){return c.id == entry.contact})[0].name : "",
        project : entry.project ? $sessionStorage.projects.filter(function(p){return p.id == entry.project})[0].name : "",
        duration : entry.duration
      };
    };

    var createEntriesFromResponse = function(entries) {
      return entries.map(createEntryFromResponse);        
    };

    var addSuccessAlert = function(message) {
      $rootScope.alerts.success = message;
    };

    this.fetchEntries = function() {
      entriesService.getEntries($routeParams.month, $routeParams.year)
      .then(function(response) {
          model.entries = createEntriesFromResponse(response.data);
      });            
    };
    
    this.init = function() {
      var self = this;
      $scope.$on('child.refresh.entries', function() {
        self.fetchEntries();
      });
      this.fetchEntries()
    };

    this.deleteEntry = function(entryId) {
      var self = this
      entriesService.delete(entryId)
      .then(function() {
        addSuccessAlert("Entry deleted successfully!");     
        self.fetchEntries();
      });
    };

    this.deleteAllSelectedEntries = function() {
      var self = this;
      entriesService.deleteBulkEntries(model.selectedEntries)
      .then(function() {
        model.allEntriesSelected = false;
        model.selectedEntries = [];
        addSuccessAlert("Entries deleted successfully!");
        self.fetchEntries();
      });
    };

  }]);

});