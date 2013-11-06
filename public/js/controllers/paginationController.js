define(['modules/app'] , function (app) {

  var formatToMonthYear = function(date) {
    var actualMonth = date.getMonth() + 1;
    return actualMonth + "/" + date.getFullYear();
  };

  var getMonthName = function(monthNumber) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November','December'];
    return monthNames[monthNumber - 1];
  };

  app.controller('paginationController',['$scope','$routeParams', function($scope, $routeParams){  	

    var today = new Date();
    var previousMonthDate = new Date($routeParams.year, $routeParams.month-2, 1);
    var nextMonthDate = new Date($routeParams.year, $routeParams.month, 1);

    var model = {
      previousMonthYear :  formatToMonthYear(previousMonthDate),
      currentMonthYear : getMonthName($routeParams.month) + " " + $routeParams.year,
      nextMonthYear : formatToMonthYear(nextMonthDate),

      showNextMonthYear : function() {
        return nextMonthDate < today;
      }
    };

    $scope.model = model;

  }]);

});