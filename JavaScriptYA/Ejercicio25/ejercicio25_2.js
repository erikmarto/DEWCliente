function cargarNumeros(){
var num1=document.getElementById('num1').value;
var num2=document.getElementById('num2').value;
num1=parseInt (num1);
num2=parseInt (num2);
if (num1>num2){
    alert('El major es ' + num1 );
}else{
    alert('El major es ' + num2 );
}
}