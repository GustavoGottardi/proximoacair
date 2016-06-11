myApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('login', {
		url: '/',
		templateUrl: '/views/pages/login.html',
		controller: 'mainController',
		data: {
          pageTitle: 'MyApp - Login'
        }
        /*,
		resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }*/
	})
	.state('dashboard', {
		url: '/dashboard',
		templateUrl: '/views/dashboard.html',
		controller: 'dashboardController',
		data: {
          pageTitle: 'MyApp - New Dashboard'
        }/*,
		resolve: {
          loginRequired: loginRequired
        }*/
	}).state('deputados', {
		url: '/deputados',
		templateUrl: '/views/deputados.html',
		controller: 'deputadosController',
		data: {
          pageTitle: 'MyApp - Deputados'
        }/*,
		resolve: {
          loginRequired: loginRequired
        }*/
	});

	$locationProvider.html5Mode(true);

	function loginRequired($q, $location, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.resolve();
		} else {
			$location.path('/');
		}
		return deferred.promise;
    }

    function skipIfLoggedIn($q, $location, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.reject();
			$location.path('/dashboard');
		} else {
			deferred.resolve();
		}
		return deferred.promise;
    }

}]);
