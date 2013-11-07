define(['modules/app','controllers/listEntriesController','controllers/addEntriesController','controllers/paginationController','service/entriesService'] , function (app) {

  app.controller('entriesController',['$scope', '$rootScope',function($scope, $rootScope){  	
	$rootScope.alerts = {};
    $scope.$on('parent.refresh.entries', function() {
      $scope.$broadcast('child.refresh.entries');
    });

  }]);

});