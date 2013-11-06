define(['modules/app','service/entriesService',] , function (app) {

  var formatToMonthYear = function(date) {
    var actualMonth = date.getMonth() + 1;
    return actualMonth + "/" + date.getFullYear();
  };

  var getMonthName = function(monthNumber) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November','December'];
    return monthNames[monthNumber - 1];
  };

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

  app.controller('entriesController',['$scope','$routeParams','$sessionStorage','entriesService', function($scope, $routeParams, $sessionStorage,entriesService){  	
    var fetchEntries = function() {
      entriesService.getEntries($routeParams.month, $routeParams.year)
      .then(function(response) {
          var result = response.data.map(function(entry) {
            return {
              id : entry.id,
              date : entry.date, 
              contact : entry.contact ? $sessionStorage.contacts.filter(function(c){return c.id == entry.contact})[0].name : "",
              project : entry.project ? $sessionStorage.projects.filter(function(p){return p.id == entry.project})[0].name : "",
              duration : entry.duration
            };
          });        
          $scope.entries = result;
      });
    };

    fetchEntries();

    var today = new Date();
    $scope.today = today;
    var previousMonthDate = new Date($routeParams.year, $routeParams.month-2, 1);
    $scope.previousMonthYear = formatToMonthYear(previousMonthDate);
    var nextMonthDate = new Date($routeParams.year, $routeParams.month, 1);
    if(nextMonthDate < today){
      $scope.nextMonthYear = formatToMonthYear(nextMonthDate);
    }

    $scope.currentMonthYear = getMonthName($routeParams.month) + " " + $routeParams.year;

    $scope.contacts = $sessionStorage.contacts;
    $scope.projects = $sessionStorage.projects;
    $scope.selectedDates = [];

    var allDates = getDates($routeParams.month,$routeParams.year);
    var firstDate = allDates[0];
    var startingDay = firstDate.getDay();
    var monthLength = allDates.length;

    $scope.dates = [];    
    var day = 1;
    for (var i = 0; i < 6; i++) {
      if(day > monthLength){
        break;
      }
      $scope.dates.push([]);
      for (var j = 0; j <= 6; j++) {
        if(i == 0 && j < startingDay){
          $scope.dates[i].push(null);
        }
        else if (day <= monthLength){
          $scope.dates[i].push(allDates[day-1]);
          day++;          
        }
        else{
         $scope.dates[i].push(null); 
        }
      }
    }


    $scope.deleteEntry = function(entryId) {
      entriesService.delete(entryId)
      .then(function() {
        $scope.alertMessage = "Entry deleted successfully!"     
        fetchEntries();
      });
    };

    $scope.toggleWeekdays = function() {
      if($scope.selectWeekdays) {
        $scope.selectedDates = getWeekdays(allDates);        
      }
      else {
        $scope.selectedDates = [];
      }
    };

    $scope.toggleSelection = function(date) {
      $scope.selectWeekdays = false;
      var id = $scope.selectedDates.indexOf(date);
      if(id > -1){
        $scope.selectedDates.splice(id, 1);
      }else{
        $scope.selectedDates.push(date);
      }
    };

    $scope.addEntries = function() {
      entriesService.addBulkEntries($scope.selectedContact, $scope.selectedProject,$scope.duration, $scope.selectedDates)
      .then(function() {
        $scope.selectedDates = [];
        $scope.selectWeekdays = false;
        $scope.alertMessage = "Entries added successfully!"     
        fetchEntries();
      });
    };

    $scope.selectedEntries = [];

    $scope.selectEntry = function(entryId) {
      $scope.selectEntries = false;
      var id = $scope.selectedEntries.indexOf(entryId);
      if(id > -1){
        $scope.selectedEntries.splice(id, 1);
      }else{
        $scope.selectedEntries.push(entryId);
      }
    };

    $scope.selectAllEntries = function() {
      if($scope.selectEntries){
        $scope.selectedEntries = $scope.entries.map(function(entry) {
          return entry.id;
        });        
      }
      else {
        $scope.selectedEntries = [];        
      }
    };

    $scope.deleteSelected = function() {
      entriesService.deleteBulkEntries($scope.selectedEntries)
      .then(function() {
        $scope.selectEntries = false;
        $scope.selectedEntries = [];
        $scope.alertMessage = "Entries deleted successfully!"     
        fetchEntries();
      });
    };

  }]);

});