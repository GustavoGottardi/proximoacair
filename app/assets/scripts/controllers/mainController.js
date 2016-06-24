myApp.controller('mainController',['$scope','$rootScope','requestFactory','$auth','$state', function($scope, $rootScope, requestFactory, $auth, $state) {  
    $scope.logout = function(){
        $auth.logout().then(function() {
            localStorage.removeItem('satellizer_token');
            $state.go('login', { redirect : true });
        });
    };

    // Hide & show password function
    $scope.inputTypePassword = 'password';
    $scope.hideShowPassword = function(){
        if ($scope.inputTypePassword == 'password'){
            $scope.inputTypePassword = 'text';
        } else{
            $scope.inputTypePassword = 'password';
        }
    };

    //Compare password in form signup
    $scope.comparePassword = function(password,confirm) {
        if (password === confirm) {
            $scope.passwordConfirm=true;
        } else {
            $scope.passwordConfirm=false;
        }
    };
    
    //Verify login authenticate
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };
}]);