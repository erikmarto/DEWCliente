var app = angular.module("app", []);

app.constant("hola", "Hola mundo");

app.constant("vidas", 5);

app.constant("velocidad", 10);

app.constant("enemigos", 20);

app.controller("HolaController", ["$scope", "hola", function ($scope, miServicioConstante) {
    $scope.valor = miServicioConstante;
}]);

//Si generamos cada vez un controller le tendriamos que llamar de una manera diferente

app.controller("VidasController", ["$scope", "vidas", function ($scope, vidas) {
    $scope.vid = vidas;
}]);

app.controller("VelocidadController", ["$scope", "velocidad", function ($scope, velocidad) {
    $scope.vel = velocidad;
}]);

app.controller("EnemigosController", ["$scope", "enemigos", function ($scope, enemigos) {
    $scope.ene = enemigos;
}]);
