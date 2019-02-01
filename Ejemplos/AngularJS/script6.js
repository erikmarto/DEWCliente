angular.module("app", [])

    .controller("PruebaController", function ($scope, $log) {
        $scope.res = "";
        $scope.userInput = "";

        $scope.calc = function () {
            r = parseInt($scope.userInput);
            rand = parseInt(Math.random() * 10 + 1);

            $scope.res = r === rand ? "acertado" : "fallado";
            $log.log("Numero generado: " + rand);
        }
    });