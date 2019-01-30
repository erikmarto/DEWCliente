var app = angular.module("app", []);

app.controller("PrimerController", ["$scope", function($scope){
    $scope.style = {
        backgroundColor : "",
        fontWeight : "800"
    }
}]);

app.controller("SegundoController", ["$scope", function($scope){
    $scope.style = {
        color : ""
    }
}]);

app.controller("TercerController", ["$scope", function($scope){
    $scope.cont = 0;
    $scope.update = function() {
        $scope.cont++;
    }
}]);B