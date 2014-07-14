define(['angular','angular-storage','angular-route','lib/autocomplete','lib/ng-quick-date'], function(angular){
	var app = angular.module('app', ['ngStorage','ngRoute','autocomplete','ngQuickDate']);

	app.config(function(ngQuickDateDefaultsProvider) {
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
	});

	return app;
});