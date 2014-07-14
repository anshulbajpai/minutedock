define(['modules/app'], function(app){
	app.config(['ngQuickDateDefaultsProvider',function(ngQuickDateDefaultsProvider) {
	  ngQuickDateDefaultsProvider.set({
	  	dateFormat: 'dd/MM/yyyy',
	  	disableTimepicker: true,
	  	disableClearButton : true,
	  	parseDateFunction : function(dateString) {
	  		var dateFormat = /^(.*?)\/(.*?)\/(.*?)$/;
	  		var dateParts = dateString.match(dateFormat);
	  		return new Date(dateParts[3],dateParts[2]-1,dateParts[1]);
	  	}
 	  });
	}]);
});