
window.onload= function(){
	
	var galeria = document.getElementById("galeria");
	var clasiBox = document.getElementById("clasiBox");
	var fotoBox = document.getElementById("fotoBox");
	var pic = 1;
	fotoBox.style.backgroundImage = "url(img_1.jpg)";
	var prev = document.getElementById("prev");
	prev.addEventListener("click", pasafotos, false);
	var next = document.getElementById("next");
	next.addEventListener("click", pasafotos, false);
	var galeriaLink = document.getElementById("galeriaLink");
	galeriaLink.addEventListener("click", muestraGaleria,false);
	var clasiLink = document.getElementById("clasiLink");
	clasiLink.addEventListener("click", muestraClasificacion,false);
	var selec = document.getElementById("sel");
	selec.addEventListener("change", actualizaListaGanadores,false);
	var radios = document.getElementsByClassName("r");
	var winners = document.getElementById("winners");
		
	function muestraGaleria(e){
		clasiBox.style.display = "none";	
		galeria.style.display = "block";
				
		}
		
	function muestraClasificacion(e){
		galeria.style.display = "none";
		clasiBox.style.display = "block";
		actualizaListaGanadores();
		
	}
	
	function pasafotos(){
		
		if(this.innerHTML == "PREV"){
			//Si es la primera foto, pondrá la última
			if (pic == 1){
				fotoBox.style.backgroundImage = "url(img_4.jpg)";
				pic = 4;
			//sinó pondrá la anterior	
			}else{
				fotoBox.style.backgroundImage = "url(img_"+parseInt(pic-1)+".jpg)";
				pic = pic -1;
			}
			
		}else{
			//Si es la última, pondrá la primera
			if (pic == 4){
				fotoBox.style.backgroundImage = "url(img_1.jpg)";
				pic = 1;
			//sinó pondrá la siguiente	
			}else{
				fotoBox.style.backgroundImage = "url(img_"+parseInt(pic+1)+".jpg)";
				pic = pic+1;
			}
		}
	}
	
	
	/*Creamos un array temporal guardando sólo la parte de la matriz que nos interesa
	y según la condicion guardamos unos elementos u otros, e imprimimos el array. */
	function actualizaListaGanadores(){
		
		var ganadores = new Array(
				new Array (new Array ("10K-Junior1","10K-Junior2","10K-Junior3"), new Array("10K-Senior1","10K-Senior2","10K-Senior3"),new Array("10K-Veteranos1","10K-Veteranos2","10K-Veteranos3")),
				new Array (new Array ("M-Junior1","M-Junior2","M-Junior3"), new Array("M-Senior1","M-Senior2","M-Senior3"),new Array("M-Veteranos1","M-Veteranos2","M-Veteranos3"))
				);
		
		
		
		if (radios[0].checked && selec.value == "Senior"){
			
			var lista = ganadores[0][1];
			winners.innerHTML = "<li>"+lista[0]+"</li><li>"+lista[1]+"</li><li>"+lista[2]+"</li>";
		}
		
		if (radios[0].checked && selec.value == "Junior"){
			
			var lista = ganadores[0][0];
			winners.innerHTML = "<li>"+lista[0]+"</li><li>"+lista[1]+"</li><li>"+lista[2]+"</li>";
		}
		
		if (radios[0].checked && selec.value == "Veterano"){
			
			var lista = ganadores[0][2];
			winners.innerHTML = "<li>"+lista[0]+"</li><li>"+lista[1]+"</li><li>"+lista[2]+"</li>";
		}
		
		if (radios[1].checked && selec.value == "Senior"){
			
			var lista = ganadores[1][1];
			winners.innerHTML = "<li>"+lista[0]+"</li><li>"+lista[1]+"</li><li>"+lista[2]+"</li>";
		}
		
		if (radios[1].checked && selec.value == "Junior"){
			
			var lista = ganadores[1][0];
			winners.innerHTML = "<li>"+lista[0]+"</li><li>"+lista[1]+"</li><li>"+lista[2]+"</li>";
		}
		
		if (radios[1].checked && selec.value == "Veterano"){
			
			var lista = ganadores[1][2];
			winners.innerHTML = "<li>"+lista[0]+"</li><li>"+lista[1]+"</li><li>"+lista[2]+"</li>";
		}
		
	}
	
	
}
