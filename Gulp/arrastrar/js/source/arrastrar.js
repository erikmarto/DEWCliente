window.onload = function () {

    //Llamamos a los divs que estaran sin arrastrarse y seran en los que se dropen las imagenes
    const circulo = document.getElementById("divCir");
    circulo.addEventListener("dragover", over, false);
    circulo.addEventListener("drop", drop, false);

    const triangulo = document.getElementById("divTri");
    triangulo.addEventListener("dragover", over, false);
    triangulo.addEventListener("drop", drop, false);

    const cuadrado = document.getElementById("divCua");
    cuadrado.addEventListener("dragover", over, false);
    cuadrado.addEventListener("drop", drop, false);

    //Llamamos a los divs que serán arrastrados hacia los drops
    document.getElementById("dragCir").addEventListener("dragstart", dragstart, false);
    document.getElementById("dragTri").addEventListener("dragstart", dragstart, false);
    document.getElementById("dragCua").addEventListener("dragstart", dragstart, false);

    //Bonton
    document.getElementById("empezar").addEventListener('click', empezar, false);
    document.getElementById("volver").addEventListener('click', volver, false);

    //Ocultamos los elementos
    document.getElementById("volver").style.display = "none";
    document.getElementById("objetos").style.display = "none";
}

//FUNCIONES FLECHA
//Mientras se arrastra
over = (ev) => {
    ev.preventDefault();
}

//Cuando empieza a ser arrastrado
dragstart = (ev) => {
    ev.dataTransfer.setData("contenido", ev.target.id);
}

//Cuando se suelta la imagen donde es correcto
drop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("contenido");
    if ((data == 'dragCir') && (ev.target.id == 'divCir')) {
        ev.target.appendChild(document.getElementById(data));
        alert('CORRECTO');
    }

    if ((data == 'dragTri') && (ev.target.id == 'divTri')) {
        ev.target.appendChild(document.getElementById(data));
        alert('CORRECTO');
    }

    if ((data == 'dragCua') && (ev.target.id == 'divCua')) {
        ev.target.appendChild(document.getElementById(data));
        alert('CORRECTO');
    } 
}



//Volver a jugar
volver = () => {
    window.location.reload();
}


//Comienzo del juego
empezar = () => {
    document.getElementById("objetos").style.display = "block";
    document.getElementById("volver").style.display = "block";
    document.getElementById("empezar").style.display = "none";
}