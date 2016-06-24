var myApp = angular.module('myApp', ['ui.router','satellizer']).config(['$authProvider', function($authProvider) {

	$authProvider.httpInterceptor = function() {
		return true;
	};

	$authProvider.withCredentials = true;
	$authProvider.tokenRoot = null;
	$authProvider.cordova = false;
	$authProvider.baseUrl = 'http://localhost:8080/';
	$authProvider.loginUrl = '/auth/authenticate';
	$authProvider.signupUrl = '/auth/signup';
	//$authProvider.unlinkUrl = '/auth/unlink/';
	$authProvider.tokenName = 'token';
	$authProvider.tokenPrefix = 'satellizer';
	$authProvider.authHeader = 'Authorization';
	$authProvider.authToken = 'Bearer';
	$authProvider.storageType = 'localStorage';

}]);