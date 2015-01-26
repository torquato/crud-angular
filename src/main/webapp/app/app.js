var app = angular.module( 'app', ['restangular','ngRoute']);
 
app.config(['RestangularProvider', '$routeProvider', function(RestangularProvider, $routeProvider)
{
   // remove o # da url
   //$locationProvider.html5Mode(true);
   
   /*$locationProvider.html5Mode({
	   enabled: true,
	   requireBase: false
	 });
   */
 
   RestangularProvider.setBaseUrl("/"); 
	 
   $routeProvider
   // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
   .when('/', {
	      templateUrl : 'app/views/home.html',
	      controller     : 'HomeCtrl',
	   })
   .when('/geral', {
		      templateUrl : 'app/views/geral.html',
		      controller  : 'GeralCtrl',
		   })
	
  
   // para a rota '/sobre', carregaremos o template sobre.html e o controller 'SobreCtrl'
   .when('/sobre', {
      templateUrl : 'app/views/sobre.html',
      controller  : 'SobreCtrl',
   })
 
   // para a rota '/contato', carregaremos o template contato.html e o controller 'ContatoCtrl'
   .when('/contato', {
      templateUrl : 'app/views/contato.html',
      controller  : 'ContatoCtrl',
   })

   .when('/rest', {
      templateUrl : 'app/views/rest.html',
      controller  : 'HelloCtrl',
   })
      .otherwise ({ redirectTo: '/' });

   
   
//   RestangularProvider.setBaseUrl('localhost:8080');
   //RestangularProvider.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' })
   //RestangularProvider.setRestangularFields({
//     id: '_id.$oid'
  // });
   
   // caso não seja nenhum desses, redirecione para a rota '/'
   
}]);