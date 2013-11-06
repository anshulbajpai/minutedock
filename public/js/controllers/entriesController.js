define(['modules/app','controllers/listEntriesController','controllers/addEntriesController','controllers/paginationController','service/entriesService'] , function (app) {

  app.controller('entriesController',['$scope', function($scope){  	

    $scope.$on('parent.refresh.entries', function() {
      $scope.$broadcast('child.refresh.entries');
    });

  }]);

});