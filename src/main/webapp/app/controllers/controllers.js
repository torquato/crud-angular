app.controller('GeralCtrl',function(Restangular, $rootScope, $location)
{
    
	Restangular.all("usuario").getList().then(function (obj){
		$rootScope.usuarios = obj; 	
	});
	
	
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