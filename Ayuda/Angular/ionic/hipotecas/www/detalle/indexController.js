(function() {
    'use strict';

	angular
		.module("app")
		.value("calcularHipoteca", calcularHipoteca)
		.controller("detalle.indexController", controller);
	
	function calcularHipoteca(DatosFinancieros, ProductosContratados){
		var salida = [];
		var vm = this;
		//Interés aplicado
		if (DatosFinancieros.tipoInteres == "FIJO"){
			salida.interAP = DatosFinancieros.intFijo;
		} else if(DatosFinancieros.tipoInteres == "VARIABLE"){
			salida.interAP = DatosFinancieros.euribor + DatosFinancieros.diferencial;
		}
		
		//restando seguros
		var n = 0.05;
		if (ProductosContratados.pSeguroCasa){
			(salida.interAP = salida.interAP - n).toFixed(3);
		}
		if (ProductosContratados.pSeguroNomina){
			(salida.interAP = salida.interAP - n).toFixed(3);
		}
		if (ProductosContratados.pSeguroVida){
			(salida.interAP = salida.interAP - n).toFixed(3);
		}
		
			
		//cuota mensual
		var capital = DatosFinancieros.cap;
		var interAP = salida.interAP;
		var plazoAnyos = DatosFinancieros.plazoAnyos;
		var dividendo = capital * interAP / 12;
		var base = 1 + ((interAP / 12) / 100 );
		var expo = -plazoAnyos * 12;
		var divisor = 100 * (1 - Math.pow(base, expo));
		salida.CuoMen  = dividendo / divisor;

		return salida;
	}
	
	function controller($scope, calcularHipoteca, remoteResource){
		var vm = this;
		vm.hipoteca = {
			nombre:"",
			apel1:"",
			apel2:"",
			nif:"",
			edad:"",
			telf:"",
			mail:"",
			ingMen:"",
			CuoMen:"",
			interAP:"",
			datos_financieros:{
				cap:"",
				tipoInteres:"",
				tipoEuribor:"",
				euribor:"",
				diferencial:"",
				intFijo:"",
				plazoAnyos:""
			},
			productos:{
				pSeguroCasa:"",
				pSeguroNomina:"",
				pSeguroVida:""
			
			}
		}
		
		//arrays de ng-options 
		vm.tiposInteres = [
			{
				valor: "FIJO",
				texto: "Fijo"
			},
			{
				valor: "VARIABLE",
				texto: "Variable"
			}
		];
		vm.tiposEuribor = [
			{
				valor: "EURIBOR",
				texto: "Euribor"
			},
			{
				valor: "EURIBOR3",
				texto: "Euribor 3"
			}
		];
		

		remoteResource.get().then(function(seguro) {
		  vm.hipoteca = seguro;
		}, function(status) {
		  alert("Ha fallado la petición. Estado HTTP:" + status);
		});
		
		vm.calcularHipoteca = function(){
			var result = calcularHipoteca.calcular(vm.hipoteca.datos_financieros, vm.hipoteca.productos);
		 
			vm.hipoteca.interAP = result.interAP;
			vm.hipoteca.CuoMen = result.CuoMen;
		}
		
		vm.cambiarEuribor = function(){
			if (vm.hipoteca.datos_financieros.tipoEuribor == "EURIBOR"){
				vm.hipoteca.datos_financieros.euribor = 0.8;
			}else if (vm.hipoteca.datos_financieros.tipoEuribor == "EURIBOR3"){
				vm.hipoteca.datos_financieros.euribor = 0.4;
			}
		}
			
		vm.guardarDatos = function(){
			alert("Datos guardados correctamente");
		}
	}
	
})();	