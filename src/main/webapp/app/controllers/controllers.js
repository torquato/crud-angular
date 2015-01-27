'use strict';
app.controller('CrudCtrl',function(Restangular, $scope, $location, ngTableParams)
{
    var usuarioVazio = { id: null,
            nome: "",
            telefone: "",
            dataNascimento: null,
            endereco: "",
            numero: "",
            cidade: "",
            estado: "",
            genero: null}
	
    $scope.usuario = angular.copy($scope.usuarioVazio);
    var usuarioServico = Restangular.all("usuario");
   
    
    $scope.reset = function() {
        $scope.usuario = angular.copy($scope.usuarioVazio);
    };
    
    // forma manual de fazer o save ou update
    $scope.salvar = function() {
    	
        if($scope.usuario != undefined && $scope.usuario.id != null && $scope.usuario.id != ""){
            var user = Restangular.one("usuario", $scope.usuario.id);
            user = $scope.usuario;    
            user.put().then(function(){
                console.log("Usuario atualizado");
                $scope.listaUsuario();
                $scope.reset();                
            })
        }else{
            console.log($scope.usuario);
            usuarioServico.post($scope.usuario).then(function(){
                console.log("Usuario salvo");
                $scope.listaUsuario();
                $scope.reset(); 
            });
        }
    };

    // Outra forma de fazer o save ou update
    $scope.salvarOuAtualizar = function() {
        //não funciona quando é um objeto novo, pois tem que ser o objeto do RestAngular
        $scope.usuario = Restangular.copy($scope.usuario);
        $scope.usuario.save().then(function(){
            console.log("Usuario salvo ou Atualizado");
            $scope.listaUsuario();
        });
    };

    $scope.atualizar = function() {
            //var user = Restangular.one("usuario", $scope.usuario.id);
            // user =  $scope.usuario;    
            // user.put().then(function(){
            //     console.log("Usuario atualizado");
            //     $scope.listaUsuario();
            // })
            $scope.usuario.put().then(function(){
                console.log("Usuario atualizado");
                $scope.listaUsuario();
            })    
    };
            

    $scope.remover = function(data) {
            data.remove().then(function(){
                console.log("Usuario Removido");
                $scope.listaUsuario();
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

    $scope.tableParams = {};
    
    $scope.listaUsuario = function() {
    	//listagem
        usuarioServico.getList().then(function (obj){
    		$scope.usuarios = obj; 	
            console.log(obj);
    	});
        console.log("Usuarios listado");
    };
    
    
    var data = [{id:1, nome: "Moroni", telefone: "132132"},
                {id:2, nome: "Tiancum", telefone: "132132"},
                {id:3, nome: "Jacob", telefone: "132132"},
                {id:4, nome: "Nephi", telefone: "132132"},
                {id:5, nome: "Enos", telefone: "132132"},
                {id:6, nome: "Tiancum", telefone: "132132"},
                {id:7, nome: "Jacob", telefone: "132132"},
                {id:8, nome: "Nephi", telefone: "132132"},
                {id:9, nome: "Enos", telefone: "132132"},
                {id:10, nome: "Tiancum", telefone: "132132"},
                {id:11, nome: "Jacob", telefone: "132132"},
                {id:12, nome: "Nephi", telefone: "132132"},
                {id:13, nome: "Enos", telefone: "132132"},
                {id:14, nome: "Tiancum", telefone: "132132"},
                {id:15, nome: "Jacob", telefone: "132132"},
                {id:16, nome: "Nephi", telefone: "132132"},
                {id:17, nome: "Enos", telefone: "132132"}];

    
    
    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 5           // count per page
    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
           $defer.resolve( data.slice((params.page() - 1) * params.count(), params.page() * params.count()) );
        }
     });
    
    
    $scope.listaUsuario();
	$scope.activetab = $location.path();
});


app.controller('HomeCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});


app.controller('HomeCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});
 
app.controller('SobreCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});
 
app.controller('ContatoCtrl', function($rootScope, $location)
{
	$rootScope.nome = '';
	$rootScope.pessoas = [ {
		id : '1',
		nome : 'joao'
	}, {
		id : '2',
		nome : 'maria'
	}, {
		id : '3',
		nome : 'jose'
	}, {
		id : '4',
		nome : 'joas'
	}, {
		id : '5',
		nome : 'julho'
	}, {
		id : '6',
		nome : 'juan'
	} ];
	
	$rootScope.activetab = $location.path();
});


app.controller('HelloCtrl', function($scope, $location, $http) 
{
    $http.get('http://rest-service.guides.spring.io/greeting').
        success(function(data) {
        	$scope.greeting = data;
      });
});