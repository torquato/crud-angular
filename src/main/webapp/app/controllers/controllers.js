'use strict';
app.controller('CrudCtrl', function(Restangular, $scope, $filter, $location, ngTableParams, RestFulResponse) {

    $scope.generos = [
        {id:'M', name : 'Masculino'},
        {id:'F', name : 'Feminino'}
    ];


    var usuarioVazio = {
        id: null,
        nome: "",
        telefone: "",
        dataNascimento: null,
        endereco: "",
        numero: "",
        cidade: "",
        estado: "",
        genero: null
    }

    $scope.usuario = angular.copy($scope.usuarioVazio);

    $scope.reset = function() {
        $scope.usuario = angular.copy($scope.usuarioVazio);
    };

    // forma manual de fazer o save ou update
    $scope.salvar = function() {

        if (!$scope.principalForm.$valid) {
            return;
        }


        if ($scope.usuario != undefined && $scope.usuario.id != null && $scope.usuario.id != "") {
            var user = Restangular.one("usuario", $scope.usuario.id);
            user = $scope.usuario;
            user.put().then(function() {
                console.log("Usuario atualizado");
                $scope.reload();
                $scope.reset();
            })
        } else {
            console.log($scope.usuario);
            Restangular.all("usuario").post($scope.usuario).then(function() {
                console.log("Usuario salvo");
                $scope.reload();
                $scope.reset();
            });
        }

    };

    // Outra forma de fazer o save ou update
    $scope.salvarOuAtualizar = function() {
        //não funciona quando é um objeto novo, pois tem que ser o objeto do RestAngular
        $scope.usuario = Restangular.copy($scope.usuario);
        $scope.usuario.save().then(function() {
            console.log("Usuario salvo ou Atualizado");
            $scope.reload();
        });
    };


    $scope.remover = function(data) {
        data.remove().then(function() {
                console.log("Usuario Removido");
                $scope.reload();
            })
            /*        Restangular.one("usuario", data.id).remove().then(function() {
                        console.log("Usuario removido" + data);
                        $scope.listaUsuario();
                    }, function() {
                        console.log("There was an error saving");
                    });*/
    };


    $scope.selecionar = function(data) {
        $scope.usuario = data;
    };

    $scope.listaUsuario = function() {
        //listagem
        Restangular.all("usuario").getList().then(function(obj) {
            $scope.usuarios = obj;
            console.log(obj);
        });
        console.log("Usuarios listado");
    };

    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 5 // count per page
    }, {
        //total: 0, // length of data
        getData: function($defer, params) {
            console.log("page " + params.page());
            console.log("size " + params.count());

            RestFulResponse.all("usuario").getList({
                page: params.page() - 1, //envia -1 pq no spring data a primeira pagina é a 0
                size: params.count(),
            }).then(function(response) {
                console.log("cabecalho " + response.headers("total"));
                params.total(response.headers("total"))
                $defer.resolve(response.data);
            });

        }
    });


    $scope.ngTableReload = function() {
        $scope.tableParams.reload();
    };

    $scope.reload = function() {
        $scope.listaUsuario();
        $scope.ngTableReload();
    };


    $scope.listaUsuario();
    $scope.activetab = $location.path();


    $scope.dt = new Date();
    $scope.opened = false;

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    }

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

});


app.controller('HomeCtrl', function($rootScope, $location) {
    $rootScope.activetab = $location.path();
});


app.controller('SobreCtrl', function($rootScope, $location) {
    $rootScope.activetab = $location.path();
});

app.controller('ContatoCtrl', function($rootScope, $location) {
    $rootScope.nome = '';
    $rootScope.pessoas = [{
        id: '1',
        nome: 'joao'
    }, {
        id: '2',
        nome: 'maria'
    }, {
        id: '3',
        nome: 'jose'
    }, {
        id: '4',
        nome: 'joas'
    }, {
        id: '5',
        nome: 'julho'
    }, {
        id: '6',
        nome: 'juan'
    }];

    $rootScope.activetab = $location.path();
});


app.controller('HelloCtrl', function($scope, $location, $http) {
    $http.get('http://rest-service.guides.spring.io/greeting').
    success(function(data) {
        $scope.greeting = data;
    });
});