window.onload = function(){
	document.onselectstart = function() {return false;}
	var start = document.getElementById("startButton");
	start.addEventListener("click", crearTabla, false);
	var footer = document.getElementById("shoutBox");
	
	var gameBox = document.getElementById("gameBox");
	
	var started= false;
	var freezed = false;
	var haybomba = false;
	var minas= new Array(100);
	var bomba= new Array(100);
	
	
	
	function crearTabla(){ //creamos una tabla de 20x20
		if(!started){
			minas = crearMinas(); //llamamos a la funcion para poner las minas
			for (var i = 0; i < 20 ; i++){
				for (var j = 0; j < 20; j++){
					var cel = document.createElement("div"); //creamos los divs de la tabla
					cel.className = "gameCel"; 
					cel.id = i + "-" + j; //Les añadimos un id con la posicón yx de la tabla
					gameBox.appendChild(cel);
					var minaP = document.createElement("p"); //creamos un p vacio en cada div
					minaP.className = "minaPa";
					cel.appendChild(minaP);
					colocarMinas(cel, minaP); //colocamos las minas para poder utilizarlas para comparar
					if (minaP.innerHTML != "*"){ //si no hay bomba las contamos para poner los números
						var currentID = cel.id;
						contador = cuenta(currentID, bomba);
						minaP.innerHTML = contador;
						if(contador == 0){
							minaP.style.display = "none"; //ocultamos el núm en caso de ser 0
						}
						minaP.style.color = "rgb(0,0,0)";
						//cambiamos el color dependiendo del número
						switch (minaP.innerHTML){
							case "1":
								minaP.style.color = "#0101DF";
								break;
							case "2":
								minaP.style.color = "#04B431";
								break;
							case "3":
								minaP.style.color = "rgb(255,0,0)";
								break;	
							case "4":
								minaP.style.color = "rgb(75,8,138)";
								break;
							case "5":
								minaP.style.color = "#610B0B";
								break;
							case "6":
								minaP.style.color = "#5F4C0B";
								break;
							case "7":
								minaP.style.color = "#A901DB";
								break;
							case "8":
								minaP.style.color = "#38610B";
								break;		
						}
						minaP.style.display="none"; //les dejamos el contenido oculto antes de seleccionar
					}
					if (j == 20){ //Cuando llega a la columna 20, quitamos float:left del estilo para terminar la fila
						cel.className = "gameCelf";
					}
					
					cel.addEventListener("click", comprobarID, false); //creamos el elemento en cada div para comprobar la casilla
					cel.addEventListener("contextmenu", marca, false);
				}
			}
			
		}
	started= true;	
	
	}
	
	/* creamos nodos y texto para las bombas */
	function colocarMinas(cel, minaP){
		for (var i = 0; i <bomba.length; i++){
			if (bomba[i] == cel.id){
				var minaTxt = document.createTextNode("*");
				minaP.appendChild(minaTxt);
				minaP.style.display="none"; //les dejamos el contenido oculto
			}
		}
	}
	
	/*creamos una funcion para hacer números aleatorios
	Luego devolvemos el resultado para utilizar en otra función	*/
	function randomize (){
		var rand = Math.floor(Math.random() * (20-0)+0);
		return rand;
	}
	
	
	/* Creamos dos arrays con 20 randoms y juntamos los valores en otro usando el mismo formato que el id de cel */
	function crearMinas(){
		
		var bombas1 = [];
		var bombas2 = [];
		
		for (var i = 0; i < bomba.length; i++){
			bombas1.push(randomize());
			bombas2.push(randomize());
			bomba[i] = bombas1[i] + "-" + bombas2[i];	
		}
		
		//para evitar duplicados y que luego cuenten bombas de más.
		for (var i = 0; i < bomba.length; i++){
			for (var j = i+1; j < bomba.length; j++){
				if (bomba[i] == bomba[j]){
					bomba.splice(j,1);
					j--;
				}
			}

		}
		
		//footer.innerHTML = bomba; //comprobación
		
	}
	
	/* Utilizamos el contenido del P de las bombas para comparar */
	function comprobarID(){
	
		//cel = this;
		celID = this.id;
		
		if(this.style.backgroundImage == ""){
			check(celID);
		}
	}
	
	
	function check(celID){
		
		var cel = document.getElementById(celID);
		//alert(cel);
		if (!freezed){
			var pa = cel.getElementsByTagName("p");
			/* si encuentra bomba: */
			var currentID = cel.id;
			if(pa[0].innerHTML == "*"){
				//pa[0].style.display = "block"; //comprobación
				cel.style.backgroundImage = "url('img/01.jpg')";
				if (cel.className == "gameCelf"){
					cel.className = "gameCelfsel";
				}else{
					cel.className = "gameCelsel";
				}
				freezed = true; //congelamos para que el usuario no pueda seguir jugando
				descubre(currentID);
				
			/* si no es bomba */	
			}else{
				//comprobaciones necesarias para recursividad
				if (pa[0].innerHTML == "0"){
					if (cel.className=="gameCel" || cel.className == "gameCelf"){
						if (cel.className == "gameCelf"){
							cel.className = "gameCelfsel";
						}else{
							cel.className = "gameCelsel";
						}
						//llamamos a la función para expandir en caso de vacía
						expande(currentID);
					}
				}else{
					//si es un número lo marca y muestra
					pa[0].style.display = "block";
				}
				if (cel.className == "gameCelf"){
					cel.className = "gameCelfsel";
				}else{
					cel.className = "gameCelsel";
				}
				
			}
			//comprobamos si finalizó el juego
			finish();
		}
		
	}
	
	/* con esta funcion no se necesitan nodos, comparamos con las ids
	de las bombas y las contamos */
	function cuenta(currentID, bomba){
		
		var contador = 0;
		var cel = document.getElementById(currentID);
		var minaPa = cel.getElementsByTagName("p");
		var pa = minaPa[0].innerHTML;
		var pos = currentID.split("-");
		
		for (var i = 0; i <bomba.length ; i++){
			var bpos = bomba[i].split("-");
			if ((pos[0])-1 == bpos[0] && (pos[1])-1 == bpos[1]){
				//alert ("arriba izquierda boom");
				contador++;
			}
			if((pos[0])-1 == bpos[0] && pos[1] == bpos[1]){
				//alert ("arriba boom");
				contador++;
			}
			if((pos[0])-1 == bpos[0] && parseInt(pos[1])+1 == bpos[1]){
				//alert ("arriba derecha boom");
				contador++;
			}
			if (pos[0] == bpos[0] && (pos[1])-1 == bpos[1]){
				//alert ("izquierda boom");
				contador++;
			}
			if (pos[0] == bpos[0] && parseInt(pos[1])+1 == bpos[1]){
				//alert ("derecha boom");
				contador++;
			}
			if (parseInt(pos[0])+1 == bpos[0] && (pos[1])-1 == bpos[1]){
				//alert ("abajo izquierda boom");
				contador++;
			}
			if (parseInt(pos[0])+1 == bpos[0] && (pos[1]) == bpos[1]){
				//alert ("abajo boom");
				contador++;
			}
			if (parseInt(pos[0])+1 == bpos[0] && parseInt(pos[1])+1 == bpos[1]){
				//alert ("abajo derecha boom");
				contador++;
			}
		}
		return contador;
	}
	
	function expande(currentID){
		
		var cel = document.getElementById(currentID);
		var minaPa = cel.getElementsByTagName("p");
		var pa = minaPa[0].innerHTML;
		var pos = currentID.split("-");	
		
		/*	c1 = arriba izquierda; c2 = arriba; c3 = arriba derecha
			c4 = izquierda; c5 derecha
			c6 = abajo izquierda; c7 = abajo; c8 = abajo derecha
		*/
		
		var c1 =(pos[0]-1)+"-"+(pos[1]-1); //c1
		var c2 = (pos[0]-1)+"-"+(pos[1]); //c2
		var c3 =(pos[0]-1)+"-"+(parseInt(pos[1])+1); //c3
		var c4 = pos[0]+"-"+(pos[1]-1); //c4
		var c5 = pos[0]+"-"+(parseInt(pos[1])+1); //c5
		var c6 = (parseInt(pos[0])+1)+"-"+(parseInt(pos[1])-1); //c6
		var c7 = (parseInt(pos[0])+1)+"-"+(pos[1]); //c7
		var c8 = (parseInt(pos[0])+1)+"-"+(parseInt(pos[1])+1); //c8 
		
		var c = [c1,c2,c3,c4,c5,c6,c7,c8];
		//alert(c);
		
		/* optimizando las condiciones de bordes */
		/*
		for (var i = 0 ; i < c.length; i++){
			if((pos[0]-1) <0 || (pos[1]-1) < 0 || (pos[0]+1) < 0 || (pos[1]+1) < 0){
				//alert("fail");
			}
			else{
				check(c[i]);
			}
		}
		*/
		
		
		if (pos[0] == 0){ //Primera fila
			if (pos[1] == 0){ //Primera columna
				check(pos[0]+"-"+(parseInt(pos[1])+1)); //c5
				check((parseInt(pos[0])+1)+"-"+(pos[1]));//c7
				check((parseInt(pos[0])+1)+"-"+(parseInt(pos[1])+1)); //c8
				//alert(c8.id);
			}else if(pos[1]!=19){ //columnas intermedias
				check(pos[0]+"-"+(pos[1]-1)); //c4
				check(pos[0]+"-"+(parseInt(pos[1])+1)); //c5
				check((parseInt(pos[0])+1)+"-"+(parseInt(pos[1])-1)); //c6
				check((parseInt(pos[0])+1)+"-"+(pos[1]));  //c7
				check((parseInt(pos[0])+1)+"-"+(parseInt(pos[1])+1)); //c8
				//alert (c8.id);
			} else { //última columna
				check(pos[0]+"-"+(pos[1]-1)); //c4
				check((parseInt(pos[0])+1)+"-"+(parseInt(pos[1])-1)); //c6
				check((parseInt(pos[0])+1)+"-"+(pos[1])); //c7
				//alert (c7.id);
			}
		}else if(pos[0] != 19){ //filas intermedias
			if (pos[1]== 0){ //Primera columna
				check((pos[0]-1)+"-"+(pos[1])); //c2
				check((pos[0]-1)+"-"+(parseInt(pos[1])+1)); //c3
				check(pos[0]+"-"+(parseInt(pos[1])+1)); //c5
				check((parseInt(pos[0])+1)+"-"+(pos[1])); //c7
				check((parseInt(pos[0])+1)+"-"+(parseInt(pos[1])+1)); //c8
				//alert(c3.id);
			} else if(pos[1]!=19){ //columnas intermedias
				check((pos[0]-1)+"-"+(pos[1]-1)); //c1
				check((pos[0]-1)+"-"+(pos[1])); //c2
				check((pos[0]-1)+"-"+(parseInt(pos[1])+1)); //c3
				check(pos[0]+"-"+(pos[1]-1)); //c4
				check(pos[0]+"-"+(parseInt(pos[1])+1)); //c5
				check((parseInt(pos[0])+1)+"-"+(parseInt(pos[1])-1)); //c6
				check((parseInt(pos[0])+1)+"-"+(pos[1])); //c7
				check((parseInt(pos[0])+1)+"-"+(parseInt(pos[1])+1)); //c8
				//alert(c4.id);
			}else{ //última columna
				check((pos[0]-1)+"-"+(pos[1]-1)); //c1
				check((pos[0]-1)+"-"+(pos[1])); //c2
				check(pos[0]+"-"+(pos[1]-1)); //c4
				check((parseInt(pos[0])+1)+"-"+(parseInt(pos[1])-1)); //c6
				check((parseInt(pos[0])+1)+"-"+(pos[1])); //c7
			}
		}else{ //última fila
			if (pos[1] == 0){ //primera columna
				check((pos[0]-1)+"-"+(pos[1])); //c2
				check((pos[0]-1)+"-"+(parseInt(pos[1])+1)); //c3
				check(pos[0]+"-"+(parseInt(pos[1])+1)); //c5
			} else if(pos[1] != 19){ //columnas intermedias
				check((pos[0]-1)+"-"+(pos[1]-1)); //c1
				check((pos[0]-1)+"-"+(pos[1])); //c2
				check((pos[0]-1)+"-"+(parseInt(pos[1])+1)); //c3
				check(pos[0]+"-"+(pos[1]-1)); //c4
				check(pos[0]+"-"+(parseInt(pos[1])+1)); //c5
			}else{ //última columna
				check((pos[0]-1)+"-"+(pos[1]-1)); //c1
				check((pos[0]-1)+"-"+(pos[1])); //c2
				check(pos[0]+"-"+(pos[1]-1)); //c4
			}
		}
		
	}
	
	/* Esta función sirve para descubrir el resto de bombas después de perder.*/
	function descubre(currentID){
			
		var cel = gameBox.getElementsByTagName("div");
		var body = document.getElementById("bg");
		var logo = document.getElementById("logo");
		var footer = document.getElementById("shoutBox");
		var enlace = document.getElementById("enlace");
		var startP = document.getElementById("startP");
		
		body.style.backgroundImage = "url('img/bg1.jpg')";
		logo.style.backgroundImage = "url('img/logo1.jpg')";
		footer.style.backgroundImage = "url('img/footer1.jpg')";
		enlace.href = "index.html";
		startP.innerHTML = "Reiniciar";
		
		/*recorremos todo el array de divs buscando bombas,
		Si no es la que explota pone el icono */
		
		for (var i = 0; i <400; i++){
			var p = cel[i].getElementsByTagName("p");
			if (p[0].innerHTML == "*" && cel[i].id != currentID){
				cel[i].style.backgroundImage = "url('img/02.jpg')";	
			}			
		}
		//alert ("Has perdido..");
	}
	
	/* en esta función permitimos marcar con el botón derecho las celdas
		que creemos que contiene una mina. Al volver a activar el evento, 
		le quitamos la imagen.
	*/
	function marca(evento){
		evento.preventDefault();
		if(!freezed){
			if(this.style.backgroundImage != ""){
				this.style.backgroundImage = "";
			}else {
				this.style.backgroundImage = "url('img/00.jpg')";
			}
		}
	}
	
	
	/*	Comprobamos si termina el juego contando las minas y las celdas
		seleccionadas. Luego verificamos que la suma de los contadores sea el 
		tamaño de la tabla.
	*/
	function finish(){
		var contMinas = 0;
		var divs = gameBox.childNodes;
		var cont = 0;
		for (var i = 1; i < 401; i++){
			//divs[0] es un elemento que no podemos usar. Por tanto empezamos el for desde 1 
			if(divs[i].className == "gameCelsel" || divs[i].className == "gameCelfsel"){
				if (divs[i].style.backgroundImage == ""){ //buscamos celdas seleccionadas
					cont++;
				}
			}
			//sacamos los textos para poder verificar las bombas
			var pa = divs[i].getElementsByTagName("p");
			if(pa[0].innerHTML == "*"){
				contMinas++;
			}
		}
		//alert(cont+" - "+contMinas);
		if((cont+contMinas)== 400){
			alert("Felicidades, has ganado el juego!");
		}
		
	}
	
	
}
