define(['angular','angular-storage','angular-bootstrap','http-auth-interceptor'], function(angular){
	return angular.module('app', ['ngStorage','ui.bootstrap','http-auth-interceptor']);
});