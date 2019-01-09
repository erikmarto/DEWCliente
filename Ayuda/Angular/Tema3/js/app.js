var app=angular.module("app",[]);


//value function calcular
app.value("calcularHipoteca", {
	calcular: function(DatosFinancieros, ProductosContratados) {
	var salida = [];
		
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
});	

//constant 
function HipotecaResource($http,baseUrl) {
  this.get=function(fnOK,fnError) {
        $http({
          method: 'GET', 
          url: baseUrl+'/datosHipoteca01.json'
        }).success(function(data, status, headers, config) {
            fnOK(data);
        }).error(function(data, status, headers, config) {
            fnError(data,status);
        });
      }
}
 
function RemoteResourceProvider() {
  var _baseUrl;
  this.setBaseUrl=function(baseUrl) {
    _baseUrl=baseUrl;
  }
  this.$get=['$http',function($http) {
    return new HipotecaResource($http,_baseUrl);
  }];
}
 
app.provider("remoteResource",RemoteResourceProvider);
 
app.constant("baseUrl", "js");
app.config(['baseUrl', 'remoteResourceProvider',function(baseUrl, remoteResourceProvider) {
    remoteResourceProvider.setBaseUrl(baseUrl);
}]);
	
app.controller("HipotecaController", ['$scope', 'calcularHipoteca', 'remoteResource',function($scope, calcularHipoteca, remoteResource) {
	
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
	

	remoteResource.get(function(hipoteca) {
      $scope.hipoteca = hipoteca;
	  DatosFinancieros = hipoteca.datos_financieros;
	  ProductosContratados = hipoteca.productos;
    }, function(data, status) {
      alert("Ha fallado la petición. Estado HTTP:" + status);
    });
	
	$scope.calcularHipoteca = function(){
		var result = calcularHipoteca.calcular($scope.hipoteca.datos_financieros, $scope.hipoteca.productos);
	 
		$scope.hipoteca.interAP = result.interAP;
		$scope.hipoteca.CuoMen = result.CuoMen;
	}
	
	$scope.cambiarEuribor = function(){
		if ($scope.hipoteca.datos_financieros.tipoEuribor == "EURIBOR"){
			$scope.hipoteca.datos_financieros.euribor = 0.8;
		}else if ($scope.hipoteca.datos_financieros.tipoEuribor == "EURIBOR3"){
			$scope.hipoteca.datos_financieros.euribor = 0.4;
		}
	}
		
	$scope.guardarDatos = function(){
		alert("Datos guardados correctamente");
	}
	
}]);	
	
	
