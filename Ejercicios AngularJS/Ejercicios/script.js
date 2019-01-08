var app=angular.module("app", [])
    .controller("HipotecaController", function($scope){
        $scope.hipoteca = {
            idHipoteca:3,
            nombre:"Juan",
            ape1:"García",
            ape2:"Perez",
            nif:"12345678Z",
            edad:32,
            telefono:"964564563",
            email:"juan_garcia_perez@gmail.com",
            ingresosMensuales:1200,
            cuotaMensual:492,
            interesAplicado:0.987,
            datosFinancieros: {
                capital:150000,
                tipoInteres:"VARIABLE",
                tipoEuribor:"EURIBOR3",
                euribor:0.287,
                diferencial:0.9,
                interesFijo:0,
                plazoAnyos:30
            },
            productosContratados: {
                seguroCasa:true,
                nomina:true,
                seguroVida:false
            }
        }
    });