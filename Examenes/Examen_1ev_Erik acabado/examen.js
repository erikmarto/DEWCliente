window.onload = function () {
	//botones galería
	const prev = document.getElementById("prev");
	prev.addEventListener("click", pasafotos, false);
	const next = document.getElementById("next");
	next.addEventListener("click", pasafotos, false);
	prev.disabled = true;
	next.disabled = false;

	//cambio de foto
	const fotoBox = document.getElementById("fotoBox");
	fotoBox.style.backgroundImage = "url(img_1.jpg)";

	//links de las paginas
	document.getElementById("galeriaLink").addEventListener("click", muestraGaleria, false);
	document.getElementById("clasiLink").addEventListener("click", muestraClasificacion, false);

	//arrastrar
	const est = document.getElementById("estilos");
	est.addEventListener("dragover", dragover, false);
	est.addEventListener("drop", drop, true);

	const act = document.getElementById("activo");
	act.addEventListener("dragover", dragover, false);
	act.addEventListener("drop", drop, true);

	//estilos de carrera
	let estilo = document.getElementsByClassName('text');
	for (let i = 0; i < estilo.length; i++) {
		estilo[i].addEventListener('dragstart', dragstart, false);
		estilo[i].parentNode.addEventListener('drop', drop, true);
		estilo[i].draggable = true;
	}

	//generos
	document.getElementById("masculino").addEventListener("click", mostrGanadores, false);
	document.getElementById("femenino").addEventListener("click", mostrGanadores, false);
}

//GALERÍA IMAGENES
let img = 1;
function pasafotos() {
	if (this.innerHTML == "PREV") {
		//si es la primera foto
		if (img == 1) {
			prev.disabled = true;
		//sinó pondrá la anterior	
		} else {
			fotoBox.style.backgroundImage = "url(img_" + parseInt(img - 1) + ".jpg)";
			img = img - 1;
			next.disabled = false;
		}
	} else {
		//si es la última
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

//CLASIFICACIÓN
//array de ganadores
const ganadores = [
	[
		["Jose-10k", "Paco-10k", "Mario-10k"],
		["Elena-10k", "Lusia-10k", "Maria-10k"]
	],
	[
		["Marcos-MedioMaraton", "Paco-MedioMaraton", "Alex-MedioMaraton"],
		["Fani-MedioMaraton", "Any-MedioMaraton", "Pepi-MedioMaraton"]
	],
	[
		["Hector-Maraton", "Oscar-Maraton", "Julian-Maraton"],
		["Lei-Maraton", "Maria-Maraton", "Julia-Maraton"]
	],
];

//muestra la lista
mostrGanadores = (ev) => {
	let modo = ev.target.id;
	let listaGanadores = document.getElementById('ganadores');
	let generos = modo === 'masculino' ? 0 : 1;
	let carrera = document.getElementById('activo').firstChild.id;
	listaGanadores.innerHTML = '';
	limpiarLista();
	switch (carrera) {
		case '10K':
			carrera = 0;
			break;
		case 'MM':
			carrera = 1;
			break;
		case 'M':
			carrera = 2;
			break;
	}
	for (let j = 0; j < 3; j++) {
		listaGanadores.innerHTML += ganadores[carrera][generos][j] + '<br>';
	}	
}

//mientras se arrastra
dragover = (ev) => {
	ev.preventDefault();
}

//cuando se arrastra y suelta el elemento
drop = (ev) => {
	ev.preventDefault();
	let arrastrar = null;
	limpiarLista();
	if (!ev.target.hasChildNodes() && ev.target.id == 'activo') {
		arrastrar = true;
		let dato = ev.dataTransfer.getData("contenido");
		ev.target.appendChild(document.getElementById(dato));
	} else if (ev.target.id === 'estilos') {
		let dato = ev.dataTransfer.getData("contenido");
		ev.target.appendChild(document.getElementById(dato));
		arrastrar = false;
	} if (arrastrar !== null) {
		elegirGenero(arrastrar);
	}
}

//cuando empieza a arrastrarse
dragstart = (ev) => {
	ev.dataTransfer.setData("contenido", ev.target.id);
}

//cuando se selecciona el genero
elegirGenero = (ev) => {
	let divGen = document.getElementById('generos');
	let inputGen = divGen.getElementsByTagName('gen');

	if (ev) {
		divGen.style.display = 'block';
		for (let j = 0; j < inputGen.length; j++) {
			inputGen[j].checked = false;
		}
	} else {
		divGen.style.display = 'none';
	}
}

//limpia la lista de ganadores
limpiarLista = () => {
	let listaGanadores = document.getElementById('ganadores');
	listaGanadores.innerHTML = '';
}

//activar o desactivar elementos de ambas pantallas
muestraGaleria = () => {
	document.getElementById("clasiBox").style.display = "none";
	document.getElementById("galeria").style.display = "block";
}

muestraClasificacion = () => {
	document.getElementById("galeria").style.display = "none";
	document.getElementById("generos").style.display = "none";
	document.getElementById("clasiBox").style.display = "block";
}