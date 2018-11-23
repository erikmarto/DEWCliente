window.onload = function () {

	//Botones
	const prev = document.getElementById("prev");
	prev.addEventListener("click", pasafotos, false);
	const next = document.getElementById("next");
	next.addEventListener("click", pasafotos, false);

	prev.disabled = true;
	next.disabled = false;

	//Cambio de foto
	const fotoBox = document.getElementById("fotoBox");
	let img = 1;
	fotoBox.style.backgroundImage = "url(img_1.jpg)";

	//Links
	document.getElementById("galeriaLink").addEventListener("click", muestraGaleria, false);
	document.getElementById("clasiLink").addEventListener("click", muestraClasificacion, false);

	//Ganadores/Maraton
	const selecM = document.getElementById("masculino").addEventListener("checked", actualizaListaGanadores, false);

	const selecF = document.getElementById("femenino").addEventListener("checked", actualizaListaGanadores, false);

	const maraton = document.getElementsByClassName("text");

	const mostrar = document.getElementById("mostrar");

	document.getElementById("clasiBox");

	//Arrastrar
	//Llamamos a los divs que estaran sin arrastrarse y seran en los que se dropen las imagenes
	const arrastrar = document.getElementById("estilo");
	arrastrar.addEventListener("dragover", over);
	arrastrar.addEventListener("drop", drop);

	document.getElementById("10k").addEventListener("dragstart", dragstart);
	document.getElementById("MM").addEventListener("dragstart", dragstart);
	document.getElementById("M").addEventListener("dragstart", dragstart);


	function pasafotos() {
		if (this.innerHTML == "PREV") {
			//Si es la primera foto
			if (img == 1) {
				prev.disabled = true;
				//sinó pondrá la anterior	
			} else {
				fotoBox.style.backgroundImage = "url(img_" + parseInt(img - 1) + ".jpg)";
				img = img - 1;
				next.disabled = false;
			}
		} else {
			//Si es la última, pondrá la primera
			if (img == 4) {
				next.disabled = true;
				//sinó pondrá la siguiente	
			} else {
				fotoBox.style.backgroundImage = "url(img_" + parseInt(img + 1) + ".jpg)";
				img = img + 1;
				prev.disabled = false;
			}
		}
	}
	/*Creamos un array temporal guardando sólo la parte de la matriz que nos interesa
	y según la condicion guardamos unos elementos u otros, e imprimimos el array. */
	function actualizaListaGanadores() {
		const ganadores = [
			[
				["Jose-10k", "Paco-10k", "Mario-10k"],
				["Elena-10k", "Lusia-10k", "Maria-10k"]
			],

			[
				["Marcos-MediaMaraton", "Paco-MediaMaraton", "Alex-MediaMaraton"],
				["Fani-MediaMaraton", "Any-MediaMaraton", "Pepi-MediaMaraton"]
			],

			[
				["Hector-Maraton", "Oscar-Maraton", "Julian-Maraton"],
				["Lei-Maraton", "Maria-Maraton", "Julia-Maraton"]
			],
		];

		if (selecM.isSelected()) {
			//10k Masculino
			if (maraton[0]) {
				let lista = ganadores[0][0];
				mostrar.innerHTML = "<li>" + lista[0] + "</li><li>" + lista[1] + "</li><li>" + lista[2] + "</li>";
			}
		}

		if (selecF.isSelected()) {
			//10k Femenino
			if (maraton[0]) {
				let lista = ganadores[0][1];
				mostrar.innerHTML = "<li>" + lista[0] + "</li><li>" + lista[1] + "</li><li>" + lista[2] + "</li>";
			}
		}
	}

}

muestraGaleria = () => {
	document.getElementById("clasiBox").style.display = "none";
	document.getElementById("galeria").style.display = "block";
}

muestraClasificacion = () => {
	document.getElementById("galeria").style.display = "none";
	document.getElementById("genero").style.display = "none";
	document.getElementById("clasiBox").style.display = "block";
}

//Arrastrar
over = (ev) => {
	ev.preventDefault();
}

dragstart = (ev) => {
	ev.dataTransfer.setData("contenido", ev.target.id);
}

drop = (ev) => {
	ev.preventDefault();
	const data = ev.dataTransfer.getData("contenido");
	ev.target.appendChild(document.getElementById(data));
	document.getElementById("genero").style.display = "block";
}