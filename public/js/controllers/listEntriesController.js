define(['modules/app','service/entriesService',] , function (app) {

  app.controller('listEntriesController',['$scope','$routeParams','$sessionStorage','entriesService', function($scope, $routeParams, $sessionStorage,entriesService){  	

    this.selectedEntries = [];
    this.selectEntries = false;

    this.fetchEntries = function() {
      var self = this;
      entriesService.getEntries($routeParams.month, $routeParams.year)
      .then(function(response) {
          self.entries = response.data.map(function(entry) {
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
      this.fetchEntries();
    };

    this.deleteEntry = function(entryId) {
      var self = this
      entriesService.delete(entryId)
      .then(function() {
        $scope.alertMessage = "Entry deleted successfully!"     
        self.init();
      });
    };

    this.deleteSelected = function() {
      var self = this;
      entriesService.deleteBulkEntries(this.selectedEntries)
      .then(function() {
        self.selectEntries = false;
        self.selectedEntries = [];
        $scope.alertMessage = "Entries deleted successfully!"     
        self.init();
      });
    };

    this.selectEntry = function(entryId) {
      this.selectEntries = false;
      var id = this.selectedEntries.indexOf(entryId);
      if(id > -1){
        this.selectedEntries.splice(id, 1);
      }else{
        this.selectedEntries.push(entryId);
      }
    };

    this.selectAllEntries = function() {
      if(this.selectEntries){
        this.selectedEntries = this.entries.map(function(entry) {
          return entry.id;
        });        
      }
      else {
        this.selectedEntries = [];        
      }
    };

  }]);

});