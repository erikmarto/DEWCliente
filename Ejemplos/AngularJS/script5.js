var app = angular.module("app", []);

app.controller("Pregunta", ['$scope', '$timeout', '$log', function ($scope, $timeout, $log) {
    $scope.producidoEvento = "NO";

    $timeout(function () {
        $scope.producidoEvento = "SI";
    }, 3000);

    $log.log("Hola Caracola");
    $log.info("Estas en mi página web");
    $log.warn("Cuidado Caracola");
    $log.error("Por ahí no!!");

}]);