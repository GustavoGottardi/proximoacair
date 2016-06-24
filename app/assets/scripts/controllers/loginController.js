myApp.controller('loginController',['$scope','$rootScope','requestFactory','$auth','$window','$state', function($scope, $rootScope, requestFactory, $auth, $window,$state) {
	$scope.login = function(user) {
		$auth.login(user).then(function(response) {
			if(response.data.statusLogin === 200){
				$state.go('deputados', { redirect : true });
			} else if(response.data.statusLogin === 404){
				alert("Usuário ou senha incorretos!");
			} else if(response.data.statusLogin === 500){
				alert("Erro ao tentar realizar o login, tente novamente mais tarde!");
			}
		}).catch(function(response) {
			console.log(response);
		});
	};

	$scope.isAuthenticated = function() {
		return $auth.isAuthenticated();
	};

	/*
	$scope.authenticate = function(provider) {
		$auth.authenticate(provider).then(function() {
			toastr.success('You are logged in!');
			$scope.authTrue();
			$window.location = 'http://localhost:8080/deputados';
		}, function(response) {
			//toastr.error('There was an error log!');
		});
	};
	*/

}]);