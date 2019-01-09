(function() {
  'use strict';

  angular
    .module('app', ['ui.router'])
    .config(config);
	
	function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

		
        $stateProvider
		
		.state('chat', {
				url: '/chat',
				templateUrl: 'chats/index.html',
				controller: 'chat.indexController',
				controllerAs: 'vm'
			});

	}
	
})();	