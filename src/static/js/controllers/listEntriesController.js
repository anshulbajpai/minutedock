define(['modules/app','models/listEntriesModel','service/entriesService'] , function (app,ListEntriesModel) {

  app.controller('listEntriesController',['$scope','$routeParams','$sessionStorage','$rootScope','entriesService', function($scope, $routeParams, $sessionStorage,$rootScope,entriesService){  	

    var model = new ListEntriesModel();
    $scope.model = model;

    var createEntryFromResponse = function(entry) {
      var getEntity = function(list, entity){
        var matchingEntities = list.filter(function(item){
          return item.id == entity;
        });
        if(matchingEntities.length > 0){
          return matchingEntities[0].name;
        }
        else return "-";
      }
      return {
        id : entry.id,
        date : entry.date, 
        contact : getEntity($sessionStorage.contacts, entry.contact),
        project : getEntity($sessionStorage.projects, entry.project),
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
        console.log(model.entries);
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