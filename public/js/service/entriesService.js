define(['modules/app'] , function (app) {
  app.service('entriesService',['$http',function($http){
  	var getLastDate = function(date) {
  		var year = date.getFullYear(), month = date.getMonth();
  		return new Date(year, month + 1, 0);
  	};
  	var formatDate = function(date) {
      var actualMonth = date.getMonth() + 1;
  		return date.getDate() + "/" + actualMonth + "/" + date.getUTCFullYear();
  	};

  	this.getEntries = function(apiKey, month, year, callback) {
  		var firstDate = new Date(year, month - 1, 01);
  		var from = formatDate(firstDate); 
  		var to = formatDate(getLastDate(firstDate)); 
  		$http.get("/"+apiKey + "/entries?from=" + from + "&to=" + to)
		  .success(function(entries, status, headers, config) {
		  	callback.success(entries);
	   	})
		  .error(function(data, status, headers, config) {
			
	   	});
  	};

  }]);
});