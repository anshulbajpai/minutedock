require.config({
	baseUrl : 'js',
	paths : {
		'jquery' : '//code.jquery.com/jquery-2.0.3.min',
		'angular' : '//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min',
		'angular-storage' : '//rawgithub.com/gsklee/ngStorage/master/ngStorage.min',
		'bootstrap' : '//netdna.bootstrapcdn.com/bootstrap/3.0.1/js/bootstrap.min'
	},
	shim : {
		'angular-storage' : {
			'exports' : 'angular-storage',
			'deps' : ['angular']	
		},
		'angular' : {
			'exports' : 'angular'
		},
		'bootstrap' : {
			'exports' : 'bootstrap',
			'deps' : ['jquery']
		}
	}
});

require(['angular','bootstrap','directives/logoutDirective','controllers/alertsController','interceptors/loadingInterceptor','interceptors/forbiddenInterceptor','routes/defaultRoutes','routes/registrationRoutes','routes/entriesPageRoutes'], function(angular){
	angular.bootstrap(document, ['app']);
});