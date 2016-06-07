myApp.factory('requestFactory', ['$rootScope', '$http','config', function($rootScope, $http, config) {

	var dataFactory = {};
    dataFactory.getRequestAjax = function (type,url,data,promisse) {
        return $http({method: type, url: config.baseUrl+url, data: data }).success(function (data, status) {
			$rootScope.$emit(promisse, data, status);
		}).error(function (error){
			console.log('Error in: ' + error.message);
		});
    };

	return dataFactory;

}]);