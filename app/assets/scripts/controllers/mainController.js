myApp.controller('mainController',['$scope','$rootScope','requestFactory', function($scope, $rootScope, requestFactory) {  
     
    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    var refresh = function(){
        (function getRequestAjax() {
            requestFactory.getRequestAjax('GET','/api/contatos','','refresh');
            $rootScope.$on('refresh', function (event, data, status) {
                $scope.contatos = data;
                $scope.formContato = {};
            });
        })();
    };

    refresh();
 
    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarContato = function() {
        (function getRequestAjax() {
            requestFactory.getRequestAjax('POST','/api/contatos',$scope.formContato,'createContacts');
            $rootScope.$on('createContacts', function (event, data, status) {
                // Limpa o formulário para criação de outros contatos
                $scope.formContato = {};
                $scope.contatos = data;
            });
        })();
    };
 
    // Ao clicar no botão Remover, deleta o contato
    $scope.deletarContato = function(id) {
        (function getRequestAjax() {
            requestFactory.getRequestAjax('DELETE','/api/contatos/'+id,'','deleteContacts');
            $rootScope.$on('deleteContacts', function (event, data, status) {
                $scope.contatos = data;
            });
        })();
    };
 
    // Ao clicar no botão Editar, edita o contato
    $scope.editarContato = function(id) {
        (function getRequestAjax() {
            requestFactory.getRequestAjax('GET','/api/contatos/'+id,'','editContacts');
            $rootScope.$on('editContacts', function (event, data, status) {
                $scope.formContato = data;
            });
        })();
    };
 
    // Recebe o JSON do contato para edição e atualiza
    $scope.atualizarContato = function() {        
        (function getRequestAjax() {
            requestFactory.getRequestAjax('PUT','/api/contatos/'+$scope.formContato._id,$scope.formContato,'updateContacts');
            $rootScope.$on('updateContacts', function (event, data, status) {
                refresh();
            });
        })();
    };
 
}]);