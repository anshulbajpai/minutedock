require.config({
	baseUrl : 'js',
	paths : {
		'angular' : '//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min',
		'angular-storage' : '//rawgithub.com/gsklee/ngStorage/master/ngStorage.min',
		'bootstrap' : '//netdna.bootstrapcdn.com/bootstrap/3.0.1/js/bootstrap.min',
		'angular-cookies' : '//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular-cookies.min',
		'jquery' : '//code.jquery.com/jquery-2.0.3.min'
	},
	shim : {
		'angular-storage' : {
			'exports' : 'angular-storage',
			'deps' : ['angular']	
		},
		'angular-cookies' : {
			'exports' : 'angular-cookies',
			'deps' : ['angular']	
		},
		'angular' : {
			'exports' : 'angular'
		},
		'jquery' : {
			'exports' : 'jquery'
		},
		'bootstrap' : {
			'exports' : 'bootstrap',
			'deps' : ['jquery']
		}
	}
});

require(['angular','bootstrap','interceptors/loadingInterceptor','interceptors/authenticationInterceptor','routes/loginRoutes','routes/entriesPageRoutes'], function(angular){
	angular.bootstrap(document, ['app']);
});