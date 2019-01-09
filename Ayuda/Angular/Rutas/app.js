(function() {
  'use strict';

  angular
    .module('app', ['ui.router'])
    .config(config);
	
	function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

		
        $stateProvider
			
			.state('detalle', {
				url: '/detalle',
				templateUrl: 'detalle/index.html',
				controller: 'detalle.indexController',
				controllerAs: 'vm'
			})
			
			.state('listado', {
				url: '/listado',
				templateUrl: 'listado/index.html',
				controller: 'listado.indexController',
				controllerAs: 'vm'
			});

	}
	
})();	