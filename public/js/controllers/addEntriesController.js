define(['modules/app','service/entriesService'] , function (app) {

  var getDates = function(month, year) {
      var dates = [];
      var firstDate = new Date(year, month-1, 1);
      var lastDate = new Date(year, month, 0);
      for(var date = firstDate; date <= lastDate; date = new Date(year,month-1, date.getDate() + 1)){
        dates.push(date);
      }
      return dates;
  };

  var getWeekdays = function(dates) {
    var today = new Date();
    return dates.filter(function(date) { return date <= today && date.getDay() >= 1 && date.getDay() <= 5 });
  };    

  app.controller('addEntriesController',['$scope','$routeParams','$sessionStorage','entriesService', function($scope, $routeParams, $sessionStorage,entriesService){  	

    this.today = new Date();
    this.contacts = $sessionStorage.contacts;
    this.projects = $sessionStorage.projects;

    var allDates = getDates($routeParams.month,$routeParams.year);
    var firstDate = allDates[0];
    var startingDay = firstDate.getDay();
    var monthLength = allDates.length;

    this.dates = [];    
    var day = 1;
    for (var i = 0; i < 6; i++) {
      if(day > monthLength){
        break;
      }
      this.dates.push([]);
      for (var j = 0; j <= 6; j++) {
        if(i == 0 && j < startingDay){
          this.dates[i].push(null);
        }
        else if (day <= monthLength){
          this.dates[i].push(allDates[day-1]);
          day++;          
        }
        else{
         this.dates[i].push(null); 
        }
      }
    }

    this.selectWeekdays = false;
    this.selectedDates = [];

    this.toggleWeekdays = function() {
      if(this.selectWeekdays) {
        this.selectedDates = getWeekdays(allDates);        
      }
      else {
        this.selectedDates = [];
      }
    };

    this.toggleSelection = function(date) {
      this.selectWeekdays = false;
      var id = this.selectedDates.indexOf(date);
      if(id > -1){
        this.selectedDates.splice(id, 1);
      }else{
        this.selectedDates.push(date);
      }
    };

    this.addEntries = function() {
      var self = this;
      entriesService.addBulkEntries($scope.selectedContact, $scope.selectedProject,$scope.duration, this.selectedDates)
      .then(function() {
        self.selectedDates = [];
        self.selectWeekdays = false;
        $scope.alertMessage = "Entries added successfully!"     
        $scope.$emit('parent.refresh.entries');
      });
    };

  }]);

});