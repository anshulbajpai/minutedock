define(['modules/app','models/paginationModel'] , function (app, PaginationModel) {

  app.controller('paginationController',['$scope','$routeParams', function($scope, $routeParams){  	

    var model = new PaginationModel($routeParams.month, $routeParams.year);
    $scope.model = model;

  }]);

});