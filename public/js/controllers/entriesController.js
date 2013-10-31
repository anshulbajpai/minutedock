define(['modules/app','service/entriesService'] , function (app) {

  var formatDate = function(date) {
    var actualMonth = date.getMonth() + 1;
    return actualMonth + "/" + date.getFullYear();
  };

  app.controller('entriesController.current',['$scope','$location','entriesService', function($scope, $location, entriesService){  	
    var today = new Date();
    var month=today.getMonth() + 1;
    var year=today.getFullYear();
    $location.path('/entries/'+ month + "/" + year);
  }])
  .controller('entriesController.month.year',['$scope','$routeParams','$sessionStorage','entriesService', function($scope, $routeParams, $sessionStorage,entriesService){  	
    $scope.previousMonth = formatDate(new Date($routeParams.year, $routeParams.month-2, 1));
    var today = new Date();
    var nextMonth = new Date($routeParams.year, $routeParams.month, 1);
    if(nextMonth < today){
      $scope.nextMonth = formatDate(nextMonth);
    }
    $scope.currentMonth = $routeParams.month + "/" + $routeParams.year;
    entriesService.getEntries($routeParams.month, $routeParams.year,{
      success : function(entries) {
        var result = entries.map(function(entry) {
          return {
            id : entry.id,
            date : entry.date, 
            contact : entry.contact ? $sessionStorage.contacts.filter(function(c){return c.id == entry.contact})[0].name : "",
            project : entry.project ? $sessionStorage.projects.filter(function(p){return p.id == entry.project})[0].name : "",
            duration : entry.duration
          };
        });        
        $scope.entries = result;
      },
      error : function() {}
    });  	
  }]);
});