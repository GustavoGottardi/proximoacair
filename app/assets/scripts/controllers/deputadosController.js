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
	    	data.votos = 0;
	    	json_list.push(data);
	    	(function getRequestAjax() {
				requestFactory.getRequestAjax('POST','/api/politicos/',data,'insertPoliticos');
				$rootScope.$on('insertPoliticos', function (event, data, status) {
				    console.log(data);
				});
			})();
	    });
	    //$scope.politiciansList = json_list;
	}).error(function(data, status, headers, config) {
	    console.log(data);
	});
	*/

	(function getRequestAjax() {
	requestFactory.getRequestAjax('GET','/api/politicos/','','getPoliticos');
		$rootScope.$on('getPoliticos', function (event, data, status) {
			$scope.politiciansList = data;
			console.log($scope.politiciansList);
			/* Só desmarcar para realizar o delete de todos os políticos
			angular.forEach(data, function(json){
				var id = json._id;			
				(function getRequestAjax() {
					requestFactory.getRequestAjax('DELETE','/api/politicos/'+id,'','insertPoliticos');
					$rootScope.$on('insertPoliticos', function (event, data, status) {
					    console.log(data);
					});
				})();
			
			});
			*/
		});
	})();

	$scope.selectedIndex = undefined;
	$scope.fetchDeputados = function(json,index) {
		$scope.selectedIndex = index;
		var votos = json.votos;
		if(votos === undefined){
			votos = 0;
		}
		var current_votos = votos + 1;
		json.votos = current_votos;
		var id_politicians = json._id;
		console.log(json);
		(function getRequestAjax() {
			requestFactory.getRequestAjax('PUT','/api/politicos/'+id_politicians,json,'insertVotes');
			$rootScope.$on('insertVotes', function (event, data, status) {
			});
		})();
	};

}]);