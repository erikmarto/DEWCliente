window.onload = function(){
    document.getElementById("botonVerificar").onclick = verificar;

    function verificar(){
        if (document.getElementById('radio1').checked){
            alert('Eres mayor de edad y por lo tanto puede ingresar');
        }
        if (document.getElementById('radio2').checked){
            alert('No eres mayor de edad y por lo tanto no puede ingresar');
        }
    }
}