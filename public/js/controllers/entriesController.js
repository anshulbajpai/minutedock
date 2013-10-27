define(['modules/app','service/entriesService'] , function (app) {

  var formatDate = function(date) {
    var actualMonth = date.getMonth() + 1;
    return actualMonth + "/" + date.getUTCFullYear();
  };

  app.controller('entriesController.current',['$scope','$cookieStore','$location','entriesService', function($scope, $cookieStore, $location, entriesService){  	
    var today = new Date();
    var month=today.getMonth() + 1;
    var year=today.getUTCFullYear();
    $location.path('/entries/'+month + "/" + year);
  }])
  .controller('entriesController.month.year',['$scope','$cookieStore','$routeParams','entriesService', function($scope, $cookieStore, $routeParams, entriesService){  	
    $scope.previousMonth = formatDate(new Date($routeParams.year, $routeParams.month-2, 1));
    var today = new Date();
    var nextMonth = new Date($routeParams.year, $routeParams.month, 1);
    if(nextMonth < today){
      $scope.nextMonth = formatDate(nextMonth);
    }
    entriesService.getEntries($cookieStore.get('apiKey'),  $routeParams.month, $routeParams.year,{
      success : function(entries) {
        $scope.entries = entries;
      },
      error : function() {}
    });  	
  }]);
});