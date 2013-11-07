define(['modules/app','service/entriesService',] , function (app) {

  app.controller('listEntriesController',['$scope','$routeParams','$sessionStorage','$rootScope','entriesService', function($scope, $routeParams, $sessionStorage,$rootScope,entriesService){  	

    var model = {
      selectedEntries : [],
      selectAllEntries : false,
      entries : [],

      isNoEntrySelected : function() {
        return this.selectedEntries.length == 0;
      },

      isEntrySelected : function(entryId) {
        return this.selectedEntries.indexOf(entryId) > -1;
      }

    };

    $scope.model = model;

    this.fetchEntries = function() {
      entriesService.getEntries($routeParams.month, $routeParams.year)
      .then(function(response) {
          model.entries = response.data.map(function(entry) {
            return {
              id : entry.id,
              date : entry.date, 
              contact : entry.contact ? $sessionStorage.contacts.filter(function(c){return c.id == entry.contact})[0].name : "",
              project : entry.project ? $sessionStorage.projects.filter(function(p){return p.id == entry.project})[0].name : "",
              duration : entry.duration
            };
          });        
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
        $rootScope.alerts.success = "Entry deleted successfully!"     
        self.fetchEntries();
      });
    };

    this.deleteAllSelectedEntries = function() {
      var self = this;
      entriesService.deleteBulkEntries(model.selectedEntries)
      .then(function() {
        model.selectAllEntries = false;
        model.selectedEntries = [];
        $rootScope.alerts.success = "Entries deleted successfully!"     
        self.fetchEntries();
      });
    };

    this.selectEntry = function(entryId) {
      model.selectAllEntries = false;
      var id = model.selectedEntries.indexOf(entryId);
      if(id > -1){
        model.selectedEntries.splice(id, 1);
      }else{
        model.selectedEntries.push(entryId);
      }
    };

    this.selectAllEntries = function() {
      if(model.selectAllEntries){
        model.selectedEntries = model.entries.map(function(entry) {
          return entry.id;
        });        
      }
      else {
        model.selectedEntries = [];        
      }
    };

  }]);

});