window.onload = function(){
	var enviar = document.getElementById("send");
	enviar.addEventListener("click", validar, false);
	var box = document.getElementById("box");
	var d30 = document.getElementById("30");
	var d31 = document.getElementById("31");
	var meses = document.getElementById("mes");
	var dias = document.getElementById("dia");
	meses.addEventListener("change", comprobar_mes,false);
	
	/*Esta funcion oculta o muestra los dias 30 y 31
	seg�n el mes, y en caso de desaparecer un d�a
	su valor a 1 */
	function comprobar_mes(){
			switch(mes.value){
				case "01":
					d30.style.display="block";
					d31.style.display="block";
					break;
				case "02":
					d30.style.display="none";
					d31.style.display="none";
					if(dias.value =="30" || dias.value == "31")
						dias.value="01";
					break;
				case "03":
					d30.style.display="block";
					d31.style.display="block";
					break;
				case "04":
					d30.style.display="block";
					d31.style.display="none";
					if (dias.value == "31"){
						dias.value="01";
					}	
					break;	
				case "05":
					d30.style.display="block";
					d31.style.display="block";
					break;
				case "06":
					d30.style.display="block";
					d31.style.display="none";
					if (dias.value == "31"){
						dias.value="01";
					}	
					break;
				case "07":
					d30.style.display="block";
					d31.style.display="block";
					break;
				case "08":
					d30.style.display="block";
					d31.style.display="block";
					break;	
				case "09":
					d30.style.display="block";
					d31.style.display="none";
					if (dias.value == "31"){
						dias.value="01";
					}	
					break;
				case "10":
					d30.style.display="block";
					d31.style.display="block";
					break;	
				case "11":
					d30.style.display="block";
					d31.style.display="none";
					if (dias.value == "31"){
						dias.value="01";
					}	
					break;
				case "12":
					d30.style.display="block";
					d31.style.display="block";
					break;		
			}
		}
	

	function validar(){
		
		var nombre = document.getElementById("nombre").value;
		var apellido = document.getElementById("apellidos").value;
		var email = document.getElementById("email").value;
		var genero = document.getElementsByClassName("sexo");
		var ciudad = document.getElementById("ciudad").value;
		var cp = document.getElementById("cp").value;
		var anyo = document.getElementById("anyo").value;
		var telf = document.getElementById("telf").value;
		var radios = document.getElementsByClassName("r1");
		var c1 = document.getElementsByClassName("c1");
		var c2 = document.getElementsByClassName("c2");
		var c3 = document.getElementsByClassName("c3");
		var title1 = document.getElementById("title1");
		var fails = 0;
		
		
		//recogemos los nodos de errores 1-5
		var error = new Array(5);
		for (var i = 1; i< 6; i++){
			 error[i] = document.getElementById("error"+i);
			 //evitamos repeticiones
			 while (error[i].firstChild){
				error[i].removeChild(error[i].firstChild);
			}
		}
		
		
		
		 /* 
		 ------------------------------------------------------------
		 
								COMPROBACIONES 
		 
		 ------------------------------------------------------------
		 */
		
		// datos personales
		
		//nombre 
		var nombrefail = document.createElement("div");
		nombrefail.className = "fail";
		nombrefail.innerHTML = "&nbsp;Nombre inv&aacute;lido&nbsp;";	
		if (!nombre_valido(nombre)){
			error[1].appendChild(nombrefail);
			fails++;
		}
		//apellido
		var apellidofail = document.createElement("div");
		apellidofail.className = "fail";
		apellidofail.innerHTML = "&nbsp;Apellido inv&aacute;lido&nbsp;";
		if (!nombre_valido(apellido)){
			error[1].appendChild(apellidofail);
			fails++;
		}
		//correo
		var correofail = document.createElement("div");
		correofail.className = "fail";
		correofail.innerHTML = "&nbsp;E-mail inv&aacute;lido&nbsp;";
		if(!email_valido(email)){
			error[1].appendChild(correofail);
			fails++;
		}
		//g�nero
		var genfail = document.createElement("div");
		genfail.className = "fail";
		genfail.innerHTML = "&nbsp;G&eacute;nero inv&aacute;lido&nbsp;";
		if(!comprobar_checks(genero,1)){
			error[1].appendChild(genfail);
			fails++;
		}
		//Ciudad
		var ciudadfail = document.createElement("div");
		ciudadfail.className = "fail";
		ciudadfail.innerHTML = "&nbsp;Ciudad inv&aacute;lida&nbsp;";
		if (!nombre_valido(ciudad)){
			error[1].appendChild(ciudadfail);
			fails++;
		}
		//CP
		var cpfail = document.createElement("div");
		cpfail.className = "fail";
		cpfail.innerHTML = "&nbsp;C.P. inv&aacute;lido&nbsp;";	
		if (!cp_valido(cp)){
			error[1].appendChild(cpfail);
			fails++;
		}
		//A�o
		var anyofail = document.createElement("div");
		anyofail.className = "fail";
		anyofail.innerHTML = "&nbsp;A&ntilde;o inv&aacute;lido&nbsp;";	
		if (!anyo_valido(anyo)){
			error[1].appendChild(anyofail);
			fails++;
		}
		//Telf
		var telffail = document.createElement("div");
		telffail.className = "fail";
		telffail.innerHTML = "&nbsp;Telf. inv&aacute;lido&nbsp;";	
		if (!telf_valido(telf)){
			error[1].appendChild(telffail);
			fails++;
		}
		
		//RadioButons
		var rfail = document.createElement("div");
		rfail.className = "fail";
		rfail.innerHTML = "No puede dejarse uno en blanco";
		if(!comprobar_checks(radios,8)){
			error[2].appendChild(rfail);
			fails++;
		}
		
		//Checkbox primer bloque (3 opciones)
		var c1fail = document.createElement("div");
		c1fail.className = "fail";
		c1fail.innerHTML = "Debe elegir 3 opciones";
		if(!comprobar_checks(c1,3)){
			error[3].appendChild(c1fail);
			fails++;
		}
		
		//Checkbox segundo bloque (2 opciones)
		var c2fail = document.createElement("div");
		c2fail.className = "fail";
		c2fail.innerHTML = "Debe elegir 2 opciones";
		if(!comprobar_checks(c2,2)){
			error[4].appendChild(c2fail);
			fails++;
		}
		//Checkbox tercer bloque (1 opci�n)
		var c3fail = document.createElement("div");
		c3fail.className = "fail";
		c3fail.innerHTML = "Debe elegir 1 opci&oacute;n";
		if(!comprobar_checks(c3,1)){
			error[5].appendChild(c3fail);
			fails++;
		}
		enviar_form();
		
		 /* 
		 ------------------------------------------------------------
		 
								Funciones
		 
		 ------------------------------------------------------------
		 */
		
		
		//acepta 2 a 60 caracteres de a-z, utilizando vocales acentuadas y �
		function nombre_valido(valor){
			var patt = /^([a-z ������]{2,60})$/i;
			if (patt.test(valor)){
				return true;
			}else{
				return false;
			}
		}
		
		//validaci�n de correo
		function email_valido(valor){
			var patt =  /^(.+\@.+\..+)$/;
			if (patt.test(valor)){
				return true;
			}else{
				return false;
			}
		}
				
		
		//validacion de CP
		function cp_valido(valor){
			var patt = /^\d{5}$/;
			if (patt.test(valor)){
				return true;
			}else{
				return false;
			}
		}
		
		//validaci�n de a�o de nacimiento entre 1896 y 2016
		function anyo_valido(valor){
			var patt =  /^[0-9]{4}$/;
			if (patt.test(valor) && valor < 2016 && valor > 1896){
				return true;
			}else{
				return false;
			}
		}
		
		//validaci�n de tel�fono nacional
		function telf_valido(valor){
			var patt = /^[0-9]{9}$/; 
			if (patt.test(valor)){
				return true;
			}else{
				return false;
			}
		}
		
		/*validacion de radiobuttons y checkboxes. 
		Pasamos el array de nodos y la cantidad de checked requeridos */
		function comprobar_checks(checks,req){
			var cont = 0;
			for (var i = 0; i < checks.length; i++){
				if (checks[i].checked){
					cont++;
				}
			}
			if (cont == req){
				return true;
			}else{
				return false;
			}
		}
		
		//Mensaje de formulario enviado
		function enviar_form(){
			
			if (fails == 0){
				box.innerHTML = "";
				var mensaje = document.createElement("p");
				mensaje.className="mensaje";
				var msg = document.createTextNode("Formulario enviado correctamente.");
				mensaje.appendChild(msg);
				box.appendChild(mensaje);
			}
		}
		
		
	}
	
	
}