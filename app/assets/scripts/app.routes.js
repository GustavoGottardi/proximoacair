myApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: '/views/login.html',
		controller: 'loginController',
		data: {
          pageTitle: 'MyApp - Login'
        }/*,
		resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }*/
	})
	.state('signup', {
		url: '/signup',
		templateUrl: '/views/signup.html',
		controller: 'signupController',
		data: {
          pageTitle: 'MyApp - Signup'
        }/*,
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

	var loginRequired = function($q, $location, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.resolve();
		} else {
			$location.path('/login');
		}
		return deferred.promise;
	};

	var skipIfLoggedIn = function($q, $location, $auth) {
		console.log("Entrou");
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.reject();
			$state.go('/deputados', { redirect: true });
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	};

}]);
