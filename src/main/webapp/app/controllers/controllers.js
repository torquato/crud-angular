app.controller('CrudCtrl',function(Restangular, $scope, $location)
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
    
    $scope.salvar = function() {
    	
        if($scope.usuario.id != null && $scope.usuario.id != ""){

            var user = Restangular.one("usuario", $scope.usuario.id);
            user =  $scope.usuario;    
            user.put().then(function(){
                console.log("Usuario atualizado");
                $scope.listaUsuario();
            })

        }else{
            usuarioServico.post($scope.usuario).then(function(){
                console.log("Usuario salvo");
                $scope.listaUsuario();
            });
        }
    };

    $scope.atualizar = function() {
            var user = Restangular.one("usuario", $scope.usuario.id);
            user =  $scope.usuario;    
            user.put().then(function(){
                console.log("Usuario atualizado");
                $scope.listaUsuario();
            })
    };
            
      

    $scope.remover = function(data) {
    	Restangular.one("usuario", data.id).remove().then(function() {
            console.log("Usuario removido" + data);
            $scope.listaUsuario();
        }, function() {
            console.log("There was an error saving");
        });
    	
    	//$scope.us.get(5).remove();
    	//var index = us.indexOf(data);
        //if (index > -1) us.splice(index, 1);
   	 	//us[index].remove();
    };


    $scope.selecionar = function(data) {
        $scope.usuario = data;
    };

    $scope.listaUsuario = function() {
    	//listagem
        usuarioServico.getList().then(function (obj){
    		$scope.usuarios = obj; 	
    	});
        console.log("Usuarios listado");
    };
	
    $scope.listaUsuario();	
	$scope.activetab = $location.path();
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