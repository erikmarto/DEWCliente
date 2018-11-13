function validar(){
    var clave1=document.getElementById('clave1').value;
    var clave2=document.getElementById('clave2').value;
    if (clave1==clave2){
        alert('Las dos claves son iguales');
    } else {
        alert('Las claves son distintas');
    }
}