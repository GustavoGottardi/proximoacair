myApp.controller('mainController',['$scope','$rootScope','requestFactory','$auth','$state', function($scope, $rootScope, requestFactory, $auth, $state) {  
    $scope.logout = function(){
        console.log("Aqui");
        $auth.logout().then(function() {
            localStorage.removeItem('satellizer_token');
            $state.go('login', { redirect : true });
        });
    };
}]);