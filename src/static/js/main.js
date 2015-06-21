require.config({
	baseUrl : 'js',
	paths : {
		'jquery' : '//code.jquery.com/jquery-2.1.1.min',
		'angular' : '//ajax.googleapis.com/ajax/libs/angularjs/1.2.14/angular',
		'angular-route' : '//ajax.googleapis.com/ajax/libs/angularjs/1.2.14/angular-route.min',
		'ngStorage' : './lib/ngStorage',
		'bootstrap' : '//netdna.bootstrapcdn.com/bootstrap/3.0.1/js/bootstrap.min',
		'ngQuickDate' : './lib/ngQuickDate'
	},
	shim : {
		'angular' : {
			'exports' : 'angular'
		},
		'angular-route' : {
			'exports' : 'angular-route',
			'deps' : ['angular']
		},
		'ngStorage' : {
			'deps' : ['angular']
		},
		'ngQuickDate' : {
			'deps' : ['angular']
		},
		'bootstrap' : {
			'exports' : 'bootstrap',
			'deps' : ['jquery']
		}
	}
});

require(['angular','bootstrap','configuration/quickdateConfiguration', 'events/locationChangeStart','controllers/menuController','controllers/alertsController','interceptors/loadingInterceptor','interceptors/httpErrorInterceptor','routes/defaultRoutes','routes/registrationRoutes','routes/entriesPageRoutes', 'routes/searchRoutes'], function(angular){
	angular.bootstrap(document, ['app']);
});
