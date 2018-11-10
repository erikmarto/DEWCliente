window.onload = function () {
    //Llamamos al boton
    enviar = document.getElementById("enviar");
    enviar.addEventListener("click", validacion, false);

    //Container
    box = document.getElementById("box");

    //Eventos de la contraseña
    password1 = document.getElementById("pwd1");
    password2 = document.getElementById("pwd2");
    password1.addEventListener("input", validacion, false);
    password2.addEventListener("input", validacion, false);

    //Eventos de la Fecha
    fechaInicio = document.getElementById("fecha");
    fechaActual = new Date();
    fechaI = fechaInicio.value.split("/");
    fechaIni = new Date(fechaI[2], fechaI[1] -1, fechaI[0] );

    //Eventos del CP
    cp = document.getElementById("cp");

}

//Funcion Flecha
validacion = () => {
    fails = 0;

    //Datos Personales
    //Comprobar las contraseñas
    if (password1.value !== password2.value) {
        password2.setCustomValidity('Las passwords deben coincidir');
        fails ++;
    }else{
        password2.setCustomValidity('');
    }

    //Comprobar Fecha	
    if (fechaActual > fechaInicio) {
        fechaInicio.setCustomValidity('El año no puede ser menor');
        fails++;
    }else{
        fechaInicio.setCustomValidity('');
    }

    //Comprobar Codigo Postal
    if (!cp_valido(cp.value)) {
        cp.setCustomValidity('Codigo postal no es correcto');
        fails++;
    }

    enviarForm();

    /* //validacion Fecha
    function anyo_valido(valor) {
        var patt = /^\d{2}\/\d{2}\/\d{4}$/;
        if (patt.test(valor) > fechaActual) {
            return true;
        } else {
            return false;
        }
    } */


    //validacion de CP
    function cp_valido(valor) {
        const patt = /^\d{5}$/;
        if (patt.test(valor)) {
            return true;
        } else {
            return false;
        }
    }

    //Mensaje de formulario enviado
    function enviarForm() {
        if (fails == 0) {
            box.innerHTML = "";
            const mensaje = document.createElement("p");
            mensaje.className = "mensaje";
            const msg = document.createTextNode("Formulario enviado correctamente.");
            mensaje.appendChild(msg);
            box.appendChild(mensaje);
        }
    }

}



