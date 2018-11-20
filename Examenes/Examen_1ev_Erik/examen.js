window.onload = function(){
	
	//Botones
	const prev = document.getElementById("prev");
	prev.addEventListener("click", pasafotos, false);
	const next = document.getElementById("next");
	next.addEventListener("click", pasafotos, false);

	prev.disable = false;
	next.disable = false;
	
	//Cambio de foto
	const fotoBox = document.getElementById("fotoBox");
	let img = 1;
	fotoBox.style.backgroundImage = "url(img_1.jpg)";
	
	//Links
	document.getElementById("galeriaLink").addEventListener("click", muestraGaleria,false);
	document.getElementById("clasiLink").addEventListener("click", muestraClasificacion,false);
	
	//Ganadores/Maraton
	const selecM = document.getElementById("masculino").addEventListener("click", actualizaListaGanadores,false);

	const selecF = document.getElementById("femenino").addEventListener("click", actualizaListaGanadores,false);

	const maraton = document.getElementsByClassName("text");

	const mostrar = document.getElementById("mostrar");

	document.getElementById("clasiBox");

	//Arrastrar
	//Llamamos a los divs que estaran sin arrastrarse y seran en los que se dropen las imagenes
    const arrastrar = document.getElementById("estilo");
	arrastrar.addEventListener("dragover", over);
    arrastrar.addEventListener("drop", drop);
	
	document.getElementById("e1").addEventListener("dragstart", dragstart);
	document.getElementById("e2").addEventListener("dragstart", dragstart);
	document.getElementById("e3").addEventListener("dragstart", dragstart);
		

	function pasafotos(){
		if(this.innerHTML == "PREV") {
			//Si es la primera foto
			if (img == 1) {
				prev.disabled = true;
			//sinó pondrá la anterior	
			}else{
				fotoBox.style.backgroundImage = "url(img_" + parseInt(img - 1)+".jpg)";
				img = img - 1;
				next.disabled = false;
			}
		}else{
			//Si es la última, pondrá la primera
			if (img == 4) {
				next.disabled = true;
			//sinó pondrá la siguiente	
			}else{
				fotoBox.style.backgroundImage = "url(img_" + parseInt(img + 1)+".jpg)";
				img = img + 1;
				prev.disabled = false;
			}
		}
	}
	
	/*Creamos un array temporal guardando sólo la parte de la matriz que nos interesa
	y según la condicion guardamos unos elementos u otros, e imprimimos el array. */
	function actualizaListaGanadores(){
			
		const ganadores = [
				new Array (new Array ("Jose","Paco", "Mario"), 
				new Array("Elena","Lusia","Maria")),

				new Array (new Array ("Marcos","Paco","Alex"), 
				new Array("Fani","Any","Pepi")),

				new Array (new Array ("Hector","Oscar","Julian"), 
				new Array("Lei","Maria","Julia")),
			];

			if (selecM.checked) {
				//10k
				if (maraton[0]) {
					let lista = ganadores[0][1];
					mostrar.innerHTML = "<li>"+lista[0]+"</li><li>"+lista[1]+"</li><li>"+lista[2]+"</li>";
				}
			}

			if (selecF.checked) {
				//10k
				if (maraton[0]) {
					let lista = ganadores[0][2];
					mostrar.innerHTML = "<li>"+lista[0]+"</li><li>"+lista[1]+"</li><li>"+lista[2]+"</li>";
				}
			}
			

			/*if (selecM.checked) {
				//Maraton
				if (maraton[1]) {
			
					let lista = ganadores[1][1];
					mostrar.innerHTML = "<li>"+lista[0]+"</li><li>"+lista[1]+"</li><li>"+lista[2]+"</li>";
				}
			}

			if (selecF.checked) {
				//Maraton
				if (maraton[1]) {
			
					let lista = ganadores[1][2];
					mostrar.innerHTML = "<li>"+lista[0]+"</li><li>"+lista[1]+"</li><li>"+lista[2]+"</li>";
				}
			}*/
	}
}	

muestraGaleria = () =>{
	document.getElementById("clasiBox").style.display = "none";	
	document.getElementById("galeria").style.display = "block";		
}
	
muestraClasificacion = () =>{
	document.getElementById("galeria").style.display = "none";
	document.getElementById("clasiBox").style.display = "block";
}

//Arrastrar
over = (ev) => {
	ev.preventDefault();
}

dragstart = (ev) => {
	ev.dataTransfer.setData("contenido", ev.target.id);
}

drop = (ev) =>{
	ev.preventDefault();
	const data = ev.dataTransfer.getData("contenido");
	ev.target.appendChild(document.getElementById(data));
}