var app=angular.module("app", []);

app.controller("myCtrl", function($scope) {
    $scope.pintores = [
        {
            "nombre" : "Pablo Picaso",
            "ciudad" : "Malaga",
        },
        {
            "nombre" : "Diego Velázquez",
            "ciudad" : "Sevilla",
        },
        {
            "nombre" : "Salvador Dalí",
            "ciudad" : "Figueras",
        },
        {
            "nombre" : "Francisco de Goya",
            "ciudad" : "Aragon",
        },
    ]
});