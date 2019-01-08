var app = angular.module("app", [])
    .controller("HipotecaController", function ($scope) {
        $scope.hipoteca = {
            idHipoteca: 3,
            nombre: "",
            ape1: "",
            ape2: "",
            nif: "",
            edad: 0,
            telefono: "",
            email: "",
            ingresosMensuales: 0,
            cuotaMensual: 0,
            interesAplicado: 0,
            datosFinancieros: {
                capital: 0,
                tipoInteres: "",
                tipoEuribor: "",
                euribor: 0,
                diferencial: 0,
                interesFijo: 0,
                plazoAnyos: 0
            },
            productosContratados: {
                seguroCasa: false,
                nomina: false,
                seguroVida: false
            }
        }

        $scope.hipotecaModelo = {
            datosFinancieros: {
                tipoInteres: ["VARIABLE", "FIJO"],
                tipoEuribor: ["EURIBOR", "EURIBOR3"]
            }
        }
        $scope.url = "detalle.html";
    });


