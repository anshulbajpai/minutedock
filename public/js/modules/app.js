define(['angular','angular-cookies','angular-storage','angular-bootstrap','http-auth-interceptor'], function(angular){
	return angular.module('app', ['ngCookies','ngStorage','ui.bootstrap','http-auth-interceptor']);
});