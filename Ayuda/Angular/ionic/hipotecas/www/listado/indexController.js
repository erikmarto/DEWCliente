(function () {
        'use strict';

        angular
          .module('app')
          .controller('listado.indexController', Controller);

        function Controller(remoteResource) {
            var vm = this;
			vm.ej = "ejemplo";
            vm.listas = [];
            vm.filtro = "";
			
            remoteResource.list().then(function (lista) {
                vm.listas = lista;
                angular.forEach(vm.listas, function(value, key){

					value.nombreCompleto = value.nombre+" "+value.apel1+" "+value.apel2;
					console.log(value.nombre);
				})
            }, function (status) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            });
			


        }
})();