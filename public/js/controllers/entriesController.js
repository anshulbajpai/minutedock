define(['modules/app','controllers/listEntriesController','controllers/addEntriesController','service/entriesService'] , function (app) {

  var formatToMonthYear = function(date) {
    var actualMonth = date.getMonth() + 1;
    return actualMonth + "/" + date.getFullYear();
  };

  var getMonthName = function(monthNumber) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November','December'];
    return monthNames[monthNumber - 1];
  };

  app.controller('entriesController',['$scope','$routeParams','$sessionStorage','entriesService', function($scope, $routeParams, $sessionStorage,entriesService){  	

    var today = new Date();
    $scope.today = today;
    var previousMonthDate = new Date($routeParams.year, $routeParams.month-2, 1);
    $scope.previousMonthYear = formatToMonthYear(previousMonthDate);
    var nextMonthDate = new Date($routeParams.year, $routeParams.month, 1);
    if(nextMonthDate < today){
      $scope.nextMonthYear = formatToMonthYear(nextMonthDate);
    }

    $scope.currentMonthYear = getMonthName($routeParams.month) + " " + $routeParams.year;

    $scope.$on('parent.refresh.entries', function() {
      $scope.$broadcast('child.refresh.entries');
    });

  }]);

});