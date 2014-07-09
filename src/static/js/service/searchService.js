define(['modules/app'] , function (app) {
  app.service('searchService',['$http',function($http){

  	var formatDate = function(date) {
      var actualMonth = date.getMonth() + 1;
  		return date.getDate() + "/" + actualMonth + "/" + date.getFullYear();
  	};

  	this.searchEntries = function( project, fromDate, toDate) {
  		var from = formatDate(fromDate); 
  		var to = formatDate(toDate);
  		return $http.get("/entries?projects="+ project.id +"&from=" + from + "&to=" + to);
  	};

  }]);
});