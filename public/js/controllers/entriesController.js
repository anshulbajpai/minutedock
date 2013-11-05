define(['modules/app','service/entriesService'] , function (app) {

  var formatDate = function(date) {
    var actualMonth = date.getMonth() + 1;
    return actualMonth + "/" + date.getFullYear();
  };

  var getMonthName = function(monthNumber) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November','December'];
    return monthNames[monthNumber - 1];
  };

  app.controller('entriesController.month.year',['$scope','$routeParams','$sessionStorage','entriesService', function($scope, $routeParams, $sessionStorage,entriesService){  	
    $scope.previousMonth = formatDate(new Date($routeParams.year, $routeParams.month-2, 1));
    var today = new Date();
    var nextMonth = new Date($routeParams.year, $routeParams.month, 1);
    if(nextMonth < today){
      $scope.nextMonth = formatDate(nextMonth);
    }
    $scope.currentMonth = getMonthName($routeParams.month) + " " + $routeParams.year;
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
  }]);

  var getDates = function(date) {
      var dates = [];
      var firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      for(var date = firstDate; date <= lastDate; date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)){
        dates.push(date);
      }
      return dates;
  };    

  app.controller('entriesController.add',['$scope','$sessionStorage','entriesService',function($scope, $sessionStorage, entriesService) {
    $scope.contacts = $sessionStorage.contacts;
    $scope.projects = $sessionStorage.projects;
    var today = new Date();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    $scope.dates = getDates(new Date());
    $scope.currentMonth = getMonthName(month) + " " + year;
    $scope.selectedDates = [];
    
    $scope.toggleSelection = function(date) {
      var id = $scope.selectedDates.indexOf(date);
      if(id > -1){
        $scope.selectedDates.splice(id, 1);
      }else{
        $scope.selectedDates.push(date);
      }
    };

    $scope.add = function() {
      entriesService.addEntries($scope.selectedContact, $scope.selectedProject,$scope.duration, $scope.selectedDates)
      .then(function() {
        $scope.selectedDates = [];
        $scope.alertEntriesAdded = "Entries added successfully!"     
      });
    };

  }]);
});