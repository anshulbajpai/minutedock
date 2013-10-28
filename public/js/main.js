require.config({
	baseUrl : 'js',
	paths : {
		'angular' : '//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min',
		'angular-cookies' : '//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular-cookies.min',
		'angular-storage' : '//rawgithub.com/gsklee/ngStorage/master/ngStorage.min'
	},
	shim : {
		'angular-cookies' : {
			'exports' : 'angular-cookies',
			'deps' : ['angular']	
		},
		'angular-storage' : {
			'exports' : 'angular-storage',
			'deps' : ['angular']	
		},
		'angular' : {
			'exports' : 'angular'
		}
	}
});

require(['angular', 'routes/loginRoutes','routes/entriesPageRoutes'], function(angular){
	angular.bootstrap(document, ['app']);
});