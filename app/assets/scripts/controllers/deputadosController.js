myApp.controller('deputadosController',['$scope','$rootScope','requestFactory','$http','config', function($scope, $rootScope, requestFactory, $http, config) {  
	//Só descomentar para realizar gravação dos politicos na base de dados mongodb
	/*
	$http({
	    method  : 'GET',
	    url     : '/api/getjsondeputados',
	    headers : {
			'Content-Type': 'application/json'
		}
	}).success(function(data, status, headers, config) {
		var json_list = [];
	    angular.forEach(data.deputados.deputado, function(data){
	    	delete data.comissoes;
	    	json_list.push(data);
	    	(function getRequestAjax() {
				requestFactory.getRequestAjax('POST','/api/politicos/',data,'insertPoliticos');
				$rootScope.$on('insertPoliticos', function (event, data, status) {
				    $scope.politicos = data;
				    console.log($scope.politicos);
				});
			})();
	    });
	    //$scope.politiciansList = json_list;
	    //console.log(JSON.stringify(data));
	}).error(function(data, status, headers, config) {
	    console.log(data);
	});
	*/

	(function getRequestAjax() {
	requestFactory.getRequestAjax('GET','/api/politicos/','','getPoliticos');
		$rootScope.$on('getPoliticos', function (event, data, status) {
			$scope.politiciansList = data;
		});
	})();
}]);