angular.module("app", [])

    .controller("CalcController", function ($scope) {
        $scope.calc = {
            opcion1: 1,
            opcion2: 0,
        }

        $scope.sumar = function () {
            $scope.calc.opcion2 += parseInt($scope.calc.opcion1);
        }

        $scope.restar = function () {
            $scope.calc.opcion2 -= parseInt($scope.calc.opcion1);
        }

        $scope.dividir = function () {
            $scope.calc.opcion2 *= parseInt($scope.calc.opcion1);
        }

        $scope.multiplicar = function () {
            $scope.calc.opcion2 /= parseInt($scope.calc.opcion1);
        }
    });