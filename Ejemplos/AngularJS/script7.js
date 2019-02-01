var app=angular.module("app", []);

app.controller("myCtrl", function($scope) {
    $scope.pintores = [
        "Pablo Picaso",
        "Diego Velázquez",
        "Salvador Dalí",
        "Francisco de Goya",
    ]
});