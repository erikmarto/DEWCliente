var app = angular.module("app", []);

app.constant("miServicioConstante", "Hola mundo");

app.controller("PruebaController", ["$scope", "miServicioConstante", function ($scope, miServicioConstante) {
    $scope.valor = miServicioConstante;
}]);


