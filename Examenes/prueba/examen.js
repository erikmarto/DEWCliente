var ganadores = [ // 0 -> maraton, 1 -> media maraton, 2 -> 10k
	[ //0 -> hombre, 1 -> mujer
		['Pepito Maraton', 'Juan Maraton', 'Eustaquio Rab'],
		['Rosa Maraton', 'Lola fdez', 'Lolita flores']
	],
	[
		['Pepito MediaMaraton', 'Juan Maraton', 'Eustaquio Rab'],
		['Rosa MediaMaraton', 'Lola fdez', 'Lolita flores']
	],
	[
		['Pepito 10kMaraton', 'Juan Maraton', 'Eustaquio Rab'],
		['Rosa 10kMaraton', 'Lola fdez', 'Lolita flores']
	]
];

window.onload= function(){	
	document.getElementById('galeriaBtn').addEventListener('click', muestra, false);
	document.getElementById('clasifBtn').addEventListener('click', muestra, false);
	document.getElementById('galPrev').addEventListener('click', pasafotos, false);
	document.getElementById('galForw').addEventListener('click', pasafotos, false);
	
	let types = document.getElementsByClassName('c-type');
	for (let i = 0; i< types.length;i++) {
		types[i].addEventListener('dragstart', drag, false);
		types[i].parentNode.addEventListener('drop', drop, true);
		types[i].draggable = true;
	}

	document.getElementById('active-type').addEventListener('dragover', function(e) {e.preventDefault()}, false);
	document.getElementById('active-type').addEventListener('drop', drop, true);
	document.getElementById('clasif-types').addEventListener('dragover', function(e) {e.preventDefault()}, false);
	document.getElementById('clasif-types').addEventListener('drop', drop, true);
	
	document.getElementById('male').addEventListener('click', showWinners, false);
	document.getElementById('female').addEventListener('click', showWinners, false);
}

//OK
showWinners = (e) => {
	let _id = e.target.id;
	let _winnerDiv = document.getElementById('three-winners');
	let _gender = _id === 'male'?0:1;
	let _type = document.getElementById('active-type').firstChild.id;
	_winnerDiv.innerHTML= '';
	clearWinners();

	switch (_type) {
		case 'M':
			_type = 0;
		break;
		case 'MM':
			_type = 1;
		break;
		case '10K':
			_type = 2;
		break;
	}

	for (let i = 0;i< 3;i++) {
		_winnerDiv.innerHTML += ganadores[_type][_gender][i] + '<br>';
	}
}

//OK
clearWinners = () => {
	let _winnerDiv = document.getElementById('three-winners');
	_winnerDiv.innerHTML= '';
}

//OK
drop = (e) => {
	e.preventDefault();
	let droppingOnActive = null;
	clearWinners();
	if (!e.target.hasChildNodes() && e.target.id == 'active-type') {
		droppingOnActive = true;
		var data = e.dataTransfer.getData("clasifType");
		e.target.appendChild(document.getElementById(data));
	}

	else if (e.target.id === 'clasif-types') { //TODO check if dragged node's parent is active-type
		var data = e.dataTransfer.getData("clasifType");
		e.target.appendChild(document.getElementById(data));
		droppingOnActive = false;
	}
	if (droppingOnActive !== null) {
		toggleGenderPick(droppingOnActive);
	}
}

//OK
toggleGenderPick = (val) => {
	let _genderDiv = document.getElementById('genderPick');
	let _genderRadio = _genderDiv.getElementsByTagName('input');

	if (val) {
		_genderDiv.style.display = 'block';
		for (let i = 0; i < _genderRadio.length; i++) {
			_genderRadio[i].checked = false;
			console.log(_genderRadio[i] + " "+ _genderRadio[i].checked);
		}
	}
	else {
		_genderDiv.style.display = 'none';
	}
}

//OK
drag = (e) => {
	e.dataTransfer.setData("clasifType", e.target.id);
}


//OK
function muestra(e){
	let _galeria = document.getElementById('galeria');
	let _clasif = document.getElementById('clasif');
	let _id = e.target.id;
	switch (_id) {
		case 'galeriaBtn':
			_galeria.style.display='flex';
			_clasif.style.display='none';
		break;
		case 'clasifBtn':
			_galeria.style.display='none';
			_clasif.style.display='block';
		break;
	}
}


//OK
function pasafotos(e){
	let _max = 4;
	let _min = 1;
	let _dir = e.target.id;
	let _img = document.getElementById('galImg');
	let _numImg = parseInt(_img.src.charAt(_img.src.indexOf('.')-1));

	//TODO disable button when it reaches _max or _min
	switch (_dir) {
		case 'galForw':
			if (_numImg === _min) {
				document.getElementById('galPrev').disabled = false;
			}
			if (_numImg+1 === _max) {
				e.target.disabled = true;
			}
			_img.src = `img_${parseInt(_numImg)+1}.jpg`;
		break;

		case 'galPrev':
			if (_numImg === _max) {
				document.getElementById('galForw').disabled = false;
			}
			if (_numImg-1 === _min) {
				e.target.disabled = true;
			}
			_img.src = `img_${parseInt(_numImg)-1}.jpg`;
		break;
	}
}