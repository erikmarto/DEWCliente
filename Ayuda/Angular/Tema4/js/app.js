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
function HipotecaResource($http, $q, baseUrl) {
  this.get = function() {
    var defered=$q.defer();
    var promise=defered.promise;
    
    $http({
      method: 'GET',
      url: baseUrl + '/datosHipoteca01.json'
    }).success(function(data, status, headers, config) {
      defered.resolve(data);
    }).error(function(data, status, headers, config) {
      defered.reject(status);
    });
    
    return promise;
    
  }
  this.list = function() {
    var defered=$q.defer();
    var promise=defered.promise;    
    
    $http({
      method: 'GET',
      url: baseUrl + '/datosHipotecas.json'
    }).success(function(data, status, headers, config) {
      defered.resolve(data);
    }).error(function(data, status, headers, config) {
      defered.reject(status);
    });
    
    
    return promise;
  }
}
 
function RemoteResourceProvider() {
  var _baseUrl;
  this.setBaseUrl=function(baseUrl) {
    _baseUrl=baseUrl;
  }
  this.$get=['$http', '$q', function($http, $q) {
    return new HipotecaResource($http, $q, _baseUrl);
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
	
	//arrays de ng-options 
	$scope.tiposInteres = [
		{
			valor: "FIJO",
			texto: "Fijo"
		},
		{
			valor: "VARIABLE",
			texto: "Variable"
		}
	];
	$scope.tiposEuribor = [
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
	  $scope.hipoteca = seguro;
	}, function(status) {
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

app.filter("filteri18n",["$filter",function($filter) {
  var filterFn=$filter("filter");
   
  /** Transforma el texto quitando todos los acentos diéresis, etc. **/
  function normalize(texto) {
    texto = texto.replace(/[áàäâ]/g, "a");
    texto = texto.replace(/[éèëê]/g, "e");
    texto = texto.replace(/[íìïî]/g, "i");
    texto = texto.replace(/[óòôö]/g, "o");
    texto = texto.replace(/[úùüü]/g, "u");
    texto = texto.toUpperCase();
    return texto;
  }
    
  /** Esta función es el comparator en el filter **/
  function comparator(actual, expected) {
      if (normalize(actual).indexOf(normalize(expected))>=0) {
        return true;
      } else {
        return false;
      }
  }
   
  /** Este es realmente el filtro **/
  function filteri18n(array,expression) {
    //Lo único que hace es llamar al filter original pero pasado
    //la nueva función de comparator
    return filterFn(array,expression,comparator)
  }
   
  return filteri18n;
   
}]);

app.controller("ListadoHipotecaController",['$scope', 'remoteResource', function($scope, remoteResource) {
	
	$scope.filtro = {
		apel1: ""
	}
	
	remoteResource.list().then(function(seguros) {
	
		$scope.hipotecas = seguros;
		angular.forEach($scope.hipotecas, function(value, key){
                value.fullName = value.nombre+" "+value.apel1+" "+value.apel2;
		});
		
	}, function(status) {
	  alert("Ha fallado la petición. Estado HTTP:" + status);
	});
	
	
	
}]);
	
app.filter('EUCoin', function () {
    return function (input) {
        return input+' \u20AC';
    };
});	
