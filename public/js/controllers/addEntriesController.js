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

  app.controller('addEntriesController',['$scope','$routeParams','$sessionStorage','$rootScope','entriesService', function($scope, $routeParams, $sessionStorage,$rootScope,entriesService){  	

    var today = new Date();
    var allDates = getDates($routeParams.month,$routeParams.year);
    var firstDate = allDates[0];
    var startingDay = firstDate.getDay();
    var monthLength = allDates.length;


    var model = {
      contacts : $sessionStorage.contacts,
      projects : $sessionStorage.projects,
      dates : [],
      selectAllWeekdays : false,
      selectedDates : [],

      isDateInFuture : function(date) {
        return date > today;
      },

      isDateSelected : function(date) {
        return this.selectedDates.indexOf(date) > -1;
      },

      isNoDateSelected : function() {
        return this.selectedDates.length == 0;
      }  
    };

    $scope.model = model;
    

    var day = 1;
    for (var i = 0; i < 6; i++) {
      if(day > monthLength){
        break;
      }
      model.dates.push([]);
      for (var j = 0; j <= 6; j++) {
        if(i == 0 && j < startingDay){
          model.dates[i].push(null);
        }
        else if (day <= monthLength){
          model.dates[i].push(allDates[day-1]);
          day++;          
        }
        else{
         model.dates[i].push(null); 
        }
      }
    }

    this.toggleAllWeekdays = function() {
      if(model.selectAllWeekdays) {
        model.selectedDates = getWeekdays(allDates);        
      }
      else {
        model.selectedDates = [];
      }
    };

    this.toggleDate = function(date) {
      model.selectAllWeekdays = false;
      var id = model.selectedDates.indexOf(date);
      if(id > -1){
        model.selectedDates.splice(id, 1);
      }else{
        model.selectedDates.push(date);
      }
    };

    this.addEntries = function() {
      var self = this;
      entriesService.addBulkEntries(model.selectedContact, model.selectedProject,model.duration, model.selectedDates)
      .then(function() {
        model.selectedDates = [];
        model.selectAllWeekdays = false;
        $rootScope.alerts.success = "Entries added successfully!"     
        $scope.$emit('parent.refresh.entries');
      });
    };

  }]);

});