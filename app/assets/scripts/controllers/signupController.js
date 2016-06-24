myApp.controller('signupController',['$scope','$rootScope','requestFactory','$auth','$window','$state', function($scope, $rootScope, requestFactory, $auth, $window, $state) {
	$scope.signup = function(user) {
		$auth.signup(user).then(function(response) {
			if(response.data.statusSignup === 200){
				$state.go('login', { redirect : true });
				alert("Cadastro realizado com sucesso, faça seu login abaixo!");
			} else if(response.data.statusSignup === 404){
				alert("Usuário já existe!");
			} else if(response.data.statusSignup === 500){
				alert("Erro ao tentar realizar o seu cadastro, tente novamente mais tarde!");
			}
		}).catch(function(response) {
			alert("Erro ao tentar realizar o seu cadastro, tente novamente mais tarde!");
			console.log("Error");
			console.log(response);
		});
	};
}]);