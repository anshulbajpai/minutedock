define(['modules/app','models/paginationModel'] , function (app, PaginationModel) {

  app.controller('paginationController',['$scope','$routeParams', function($scope, $routeParams){  	

    $scope.model = new PaginationModel($routeParams.month, $routeParams.year);

  }]);

});