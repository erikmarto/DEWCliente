(function () {
        'use strict';
		
		angular
          .module('app')
          .controller('chat.indexController', Controller);

        function Controller(remoteResource) {
            var vm = this;
			vm.chats = [];
			
			remoteResource.list().then(function (lista) {
                vm.chats = lista;
				
                
            }, function (status) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            });
			


        }
		
})();		