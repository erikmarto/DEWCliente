window.onload = function () {
    document.getElementById("send").addEventListener("click", validar, false);
    /*const box = document.getElementById("box"); */

    function validar() {

        let nombre = document.getElementById("nombre").value;
        /* let email = document.getElementById("email").value;
        let pwd1 = document.getElementById("pwd1").value;
        let pwd2 = document.getElementById("pwd2").value;
        let cp = document.getElementById("cp").value;
        var title1 = document.getElementById("title1");
        let fails = 0; */

        //recogemos errores 
        let error = new Array(1);
        for (let i = 0; i < error.length; i++) {
            error[i] = document.getElementById("error" + i);
            while (error[i].firstChild){
				error[i].removeChild(error[i].firstChild);
			}
        }

        


        //COMPROBACION datos personales
        //nombre 
        var nombrefail = document.createElement("div");
        nombrefail.className = "fail";
        nombrefail.innerHTML = "&nbsp;Nombre inv&aacute;lido&nbsp;";
        if (!nombre_valido(nombre)) {
            error[1].appendChild(nombrefail);
            fails++;
        }
        //E-mail
        /* var correofail = document.createElement("div");
        correofail.className = "fail";
        correofail.innerHTML = "&nbsp;E-mail inv&aacute;lido&nbsp;";
        if (!email_valido(email)) {
            error[2].appendChild(correofail);
            fails++;
        }  */
        /* //Password
        var correofail = document.createElement("div");
        correofail.className = "fail";
        correofail.innerHTML = "&nbsp;E-mail inv&aacute;lido&nbsp;";
        if (!email_valido(email)) {
            error[2].appendChild(correofail);
            fails++;
        } */
        /* //CP
        var cpfail = document.createElement("div");
        cpfail.className = "fail";
        cpfail.innerHTML = "&nbsp;C.P. inv&aacute;lido&nbsp;";
        if (!cp_valido(cp)) {
            error[3].appendChild(cpfail);
            fails++;
        } */
        //enviar_form();

        //FUNCIONES
        //acepta 2 a 60 caracteres de a-z, utilizando vocales acentuadas y �
         function nombre_valido(valor) {
            var patt = /^([a-z ������]{2,60})$/i;
            if (patt.test(valor)) {
                return true;
            } else {
                return false;
            }
        } 

        /* //validaci�n de correo
        function email_valido(valor) {
            var patt = /^(.+\@.+\..+)$/;
            if (patt.test(valor)) {
                return true;
            } else {
                return false;
            }
        } 

        //validacion de CP
        function cp_valido(valor) {
            var patt = /^\d{5}$/;
            if (patt.test(valor)) {
                return true;
            } else {
                return false;
            }
        } */


        //Mensaje de formulario enviado
        /* function enviar_form() {
           if (fails == 0) {
                box.innerHTML = "";
                const mensaje = document.createElement("p");
                mensaje.className = "mensaje";
                const msg = document.createTextNode("Formulario enviado correctamente.");
                 mensaje.appendChild(msg);
                box.appendChild(mensaje);
            } 
        } */

    }


}