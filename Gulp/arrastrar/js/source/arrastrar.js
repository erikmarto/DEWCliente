window.onload = function () {

    //Marcador
    let score = 0;
    let scoreBox = document.getElementById("scoreBox");
    document.getElementById("mensajeFinal");

    //Bontones
    document.getElementById("empezar").addEventListener('click', empezar, false);
    document.getElementById("volver").addEventListener('click', volver, false);

    //Llamamos a los divs que estaran sin arrastrarse y seran en los que se dropen las imagenes
    const circulo = document.getElementById("divCir");
    const triangulo = document.getElementById("divTri");
    const cuadrado = document.getElementById("divCua");

    circulo.addEventListener("dragover", over);
    circulo.addEventListener("drop", drop);
    triangulo.addEventListener("dragover", over);
    triangulo.addEventListener("drop", drop);
    cuadrado.addEventListener("dragover", over);
    cuadrado.addEventListener("drop", drop);

    //Llamamos a los divs que serán arrastrados hacia los drops
    document.getElementById("dragCir").addEventListener("dragstart", dragstart);
    document.getElementById("dragTri").addEventListener("dragstart", dragstart);
    document.getElementById("dragCua").addEventListener("dragstart", dragstart);

    //Ocultamos los elementos
    document.getElementById("objetos").style.display = "none"; 
    document.getElementById("volver").style.display = "none";
    document.getElementById("scoreBox").style.display = "none";
    document.getElementById("mensajeFinal").style.display = "none";

    //Mientras se arrastra
    function over(ev) {
        ev.preventDefault();
    }

    //Cuando empieza a ser arrastrado
    function dragstart(ev) {
        ev.dataTransfer.setData("contenido", ev.target.id);
    }

    //Cuando se suelta la imagen donde es correcto
    scoreBox.innerHTML = "Score: " + 0;
    function drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("contenido");

        if ((data == 'dragCir') && (ev.target.id == 'divCir')) {
            ev.target.appendChild(document.getElementById(data));
            alert('CORRECTO');
            score = score + 100;
        }
        if ((data == 'dragTri') && (ev.target.id == 'divTri')) {
            ev.target.appendChild(document.getElementById(data));
            alert('CORRECTO');
            score = score + 100;
        }
        if ((data == 'dragCua') && (ev.target.id == 'divCua')) {
            ev.target.appendChild(document.getElementById(data));
            alert('CORRECTO');
            score = score + 100;
        }
        if (score > 0) {
            scoreBox.innerHTML = "Score: " + score;
        }
        if (score == 300) {
            document.getElementById("scoreBox").style.display = "none";
            document.getElementById("mensajeFinal").style.display = "block";
            document.getElementById("volver").style.display = "block";
        }
    }
}

//FUNCIONES FLECHA

//Volver a jugar
volver = () => {
    window.location.reload();
}

//Comienzo del juego
empezar = () => {
    document.getElementById("objetos").style.display = "block";
    document.getElementById("scoreBox").style.display = "block";
    document.getElementById("empezar").style.display = "none";
}