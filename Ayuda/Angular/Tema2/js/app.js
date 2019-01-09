var app=angular.module("app",[]);



function HipotecaController($scope) {
	$scope.hipoteca = {
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
	
	$scope.cambiarEuribor = function(){
		if ($scope.hipoteca.datos_financieros.tipoEuribor == "EURIBOR"){
			$scope.hipoteca.datos_financieros.euribor = 0.8;
		}else if ($scope.hipoteca.datos_financieros.tipoEuribor == "EURIBOR3"){
			$scope.hipoteca.datos_financieros.euribor = 0.4;
		}
	}
	
	$scope.calcularHipoteca = function(){
		
		//Interés aplicado
		if ($scope.hipoteca.datos_financieros.tipoInteres == "FIJO"){
			$scope.hipoteca.interAP = $scope.hipoteca.datos_financieros.intFijo;
		} else if($scope.hipoteca.datos_financieros.tipoInteres == "VARIABLE"){
			$scope.hipoteca.interAP = $scope.hipoteca.datos_financieros.euribor + $scope.hipoteca.datos_financieros.diferencial;
		}
		
		//restando seguros
		var n = 0.05;
		if ($scope.hipoteca.productos.pSeguroCasa){
			($scope.hipoteca.interAP = $scope.hipoteca.interAP - n).toFixed(3);
		}
		if ($scope.hipoteca.productos.pSeguroNomina){
			($scope.hipoteca.interAP = $scope.hipoteca.interAP - n).toFixed(3);
		}
		if ($scope.hipoteca.productos.pSeguroVida){
			($scope.hipoteca.interAP = $scope.hipoteca.interAP - n).toFixed(3);
		}
		
		//cuota mensual
		var capital = $scope.hipoteca.datos_financieros.cap;
		var interAP = $scope.hipoteca.interAP;
		var plazoAnyos = $scope.hipoteca.datos_financieros.plazoAnyos;
		var dividendo = capital * interAP / 12;
		var base = 1 + ((interAP / 12) / 100 );
		var expo = -plazoAnyos * 12;
		var divisor = 100 * (1 - Math.pow(base, expo));

		$scope.hipoteca.CuoMen  = dividendo / divisor;
	}
	
	$scope.guardarDatos = function(){
		alert("Datos guardados correctamente");
	}
}