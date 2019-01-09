var app=angular.module("app",[]);
  
function PruebaController($scope) {
  $scope.msg="Hola Mundo";
   
  $scope.cambiarTexto=function() {
    $scope.msg="Adios mundo cruel :-)";
  }
   
}