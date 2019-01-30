var app = angular.module("app", []);

app.constant("miServicioConstante", "Hola mundo");

app.constant("vidas", 5);

app.constant("velocidad", 10);

app.constant("enemigos", 20);

app.controller("PruebaController", ["$scope", "miServicioConstante", "vidas",  "velocidad", "enemigos", function ($scope, miServicioConstante, vidas, velocidad, enemigos) {
    $scope.valor = miServicioConstante;
    $scope.vid = vidas;
    $scope.vel = velocidad;
    $scope.ene = enemigos;
}]);

//Si generamos cada vez un controller le tendriamos que llamar de una manera diferente

/* app.controller("PruebaController", ["$scope", "vidas", function ($scope, vidas) {
    $scope.vid = vidas;
}]);

app.controller("PruebaController", ["$scope", "velocidad", function ($scope, velocidad) {
    $scope.vel = velocidad;
}]);

app.controller("PruebaController", ["$scope", "enemigos", function ($scope, enemigos) {
    $scope.ene = enemigos;
}]);
 */


