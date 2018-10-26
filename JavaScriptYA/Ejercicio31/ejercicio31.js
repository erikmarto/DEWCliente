window.onload = function() {
    document.getElementById("botonComprobar").onclick = comprobar;

    function comprobar() {
        document.getElementById("usuario").value;
        if (contraseña.value.length<7 || contraseña.value.length>20 ){
            alert("Cantidad de caracteres no valido ( la clave debe contener 7-20 )");
        } else {
            alert("Gracias por registrarte");
        }
    }
}

