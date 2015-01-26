var app = angular.module('app', [ 'restangular', 'ngRoute','ngTable' ]);

app.config([ 'RestangularProvider', '$routeProvider',
		function(RestangularProvider, $routeProvider) {
			// remove o # da url
			// $locationProvider.html5Mode(true);

			/*
			 * $locationProvider.html5Mode({ enabled: true, requireBase: false
			 * });
			 */

			RestangularProvider.setBaseUrl("/");
//			RestangularProvider.setRequestInterceptor(function(elem, operation) {
//				  if (operation === "remove") {
//				     return null;
//				  } 
//				  return elem;
//				});
			
			$routeProvider
			.when('/', {
				templateUrl : 'app/views/crud.html',
				controller : 'CrudCtrl',
			}).when('/crudPaginado', {
				templateUrl : 'app/views/crudPaginado.html',
				controller : 'CrudCtrl',
			})
			// para a rota '/sobre', carregaremos o template sobre.html e o
			// controller 'SobreCtrl'
			.when('/sobre', {
				templateUrl : 'app/views/sobre.html',
				controller : 'SobreCtrl',
			})

			// para a rota '/contato', carregaremos o template contato.html e o
			// controller 'ContatoCtrl'
			.when('/contato', {
				templateUrl : 'app/views/contato.html',
				controller : 'ContatoCtrl',
			})
			.when('/rest', {
				templateUrl : 'app/views/rest.html',
				controller : 'HelloCtrl',
			}).otherwise({
				redirectTo : '/'
			});

			// RestangularProvider.setBaseUrl('localhost:8080');
			// RestangularProvider.setDefaultRequestParams({ apiKey:
			// '4f847ad3e4b08a2eed5f3b54' })
			// RestangularProvider.setRestangularFields({
			// id: '_id.$oid'
			// });

			// caso não seja nenhum desses, redirecione para a rota '/'

		} ]);