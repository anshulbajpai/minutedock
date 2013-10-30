require.config({
	baseUrl : 'js',
	paths : {
		'angular' : '//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min',
		'angular-cookies' : '//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular-cookies.min',
		'angular-storage' : '//rawgithub.com/gsklee/ngStorage/master/ngStorage.min',
		'angular-bootstrap' : '//raw.github.com/angular-ui/bootstrap/gh-pages/ui-bootstrap-tpls-0.6.0'
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
		'angular-bootstrap' : {
			'exports' : 'angular-bootstrap',
			'deps' : ['angular']	
		},
		'angular' : {
			'exports' : 'angular'
		}
	}
});

require(['angular','directives/authDirective','routes/loginRoutes','routes/entriesPageRoutes'], function(angular){
	angular.bootstrap(document, ['app']);
});