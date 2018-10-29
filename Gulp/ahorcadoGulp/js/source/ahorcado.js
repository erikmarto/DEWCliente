window.onload = function () {
    // evento para empezar el juego
    document.getElementById("botonIniciar").addEventListener('click', empezarJuego, false);
    // evento para comprobar la letra desde el botón
    document.getElementById("botonComprobar").addEventListener('click', comprobarPalabra, false);
    // evento para reiniciar el juego
    document.getElementById("botonReiniciar").addEventListener('click', reiniciarJuego, false);
   

    // escondemos los divs correspondientes
    document.getElementById("introducirLetra").style.display = "none";
    document.getElementById("botonReiniciar").style.display = "none";
    document.getElementById("letrasErroneas").style.display = "none";


    const teclado = document.getElementById("eligeLetra");
    
    teclado.addEventListener("keyup", function (event) {
        // numero 13 representa el "Enter" para introducir letra
        if (event.keyCode === 13) {
            document.getElementById("botonComprobar").click();
        }
        // bloquea simbolos a el input
        if (!this.value.match(/[A-Za-z]/)) {
            this.value = this.value.replace(/[^A-Za-z_]/g, '');
        }
        event.preventDefault();
    });
}

//let que recoge la palabra
let palabra = "";
//const que contiene la palabra AHORCADO
const stringAhorcado = ["A", "H", "O", "R", "C", "A", "D", "O"];
//let que recoge el num de los intentos
let numIntentos = stringAhorcado.length;
//variable que recoge el num de aciertos
let numAciertos = 0;
//let que recoge las letras usadas
let numLetras = [""];
//ARRAY que contiene las palabras que pueden salir
const arrayPalabras = ["Coco", "Luz", "Fuente", "Casa", "Enorme", "Silla", "Ordenador", "Pizarra", "Pantalon", "Fiesta",
    "Parque", "Escaleras", "Videojuegos", "Deporte", "Insecto", "Amistad", "Pulpo", "Lluvia", "Naranja", "Matematicas",
    "Mochila", "Servir", "Deletrear", "Hombre", "Enorme", "Galera", "Prototipo", "Veloz", "Ayuntamiento", "Leon"];



function newTablaAhorcado() {
    //creamos una nueva tabla con la palabra AHORCADO
    const tbl1 = document.createElement('table');
    const tr1 = tbl1.insertRow();
    for (let i = 0; i < stringAhorcado.length; i++) {
        const td1 = tr1.insertCell();
        td1.setAttribute("id", "celdaAhorcado" + i);
        td1.setAttribute("class", "celdaAhorcado");
        td1.appendChild(document.createTextNode(stringAhorcado[i]));
        td1.style.borderBottom = "thick solid #2E2E2E";
        td1.style.display = "none";
    }
    document.getElementById("posicionFallo").appendChild(tbl1);
}

function newTablaPalabra() {
    //creamos nueva tabla con la palabra a adivinar
    let textoArray = palabra.split("");
    const tbl2 = document.createElement('table');
    const tr2 = tbl2.insertRow();
    for (let i = 0; i < textoArray.length; i++) {
        const td2 = tr2.insertCell();
        td2.setAttribute("id", "celdaLetra" + i);
        td2.setAttribute("class", "celdaLetra");
        td2.appendChild(document.createTextNode(""));
        td2.style.borderBottom = "thick solid #2E2E2E";
        td2.style.width = "30px";
    }
    document.getElementById("posicionLetra").appendChild(tbl2);
}

//creamos una funcion para que pueda empezar el juego como tal
function empezarJuego() {

    //coge la palabra del array aleatoriamente
    let posicionLetra = Math.floor(Math.random() * arrayPalabras.length);
    palabra = arrayPalabras[posicionLetra];

    //hacemos visible el div que contiene introducirLetra y el boton comprobar
    document.getElementById("introducirLetra").style.display = "block";
    document.getElementById("letrasErroneas").style.display = "block";

    //ocultamos el boton de inicio
    document.getElementById("botonIniciar").style.display = "none";
    document.getElementById("reglas").style.display = "none";

    //llamamos a las funciones que crean las tablas
    newTablaAhorcado();
    newTablaPalabra();

    //hacemos que haga focus en este evento para que nos lleve al input
    document.getElementById('eligeLetra').focus();
}

function comprobarPalabra() {

    //recogemos la letra que se introduce
    const letra = document.getElementById("eligeLetra").value;

    //let que crea un array con las letras de la palabra
    let stringLetra = palabra.split("");

    //let para comprobar si ya se ha introducido la letra anteriormente
    let letraEncontrada = false;

    //recorremos el array con las letras y comprobamos si ya se ha usado la letra
    for (let i = 0; i < numLetras.length; i++) {
        if (letra == numLetras[i]) {
            letraEncontrada = true;
        }
    }
    
    //si ya se introducio la letra antes vuelve al input
    if (letraEncontrada) {
        //alert("Ya has introducido esta letra " + letra + " escoge otra que no hayas elegido");
    } else {

        //si no estaba la letra la introducimos en el array
        numLetras.push(letra);
        
        //let boolean que nos sirve para incrementar los fallos si no se encuentra la letra
        let letraErronea = false;

        //comprobamos si la letra es correcta o no
        for (let i = 0; i < stringLetra.length; i++) {

            //si encuentra la palabra pone la letra en las casillas y anota los aciertos
            if (letra.toLowerCase() == stringLetra[i].toLowerCase()) {
                letraErronea = true;
                document.getElementById("celdaLetra" + i).innerHTML = letra.toUpperCase();
                numAciertos++;
                
                //cuando se acierte la palabra escondemos los inputs y el boton de comprobar
                //y aparece un mensaje donde pone que se ha acertado la palabra, además de hacer visible el boton de volver a jugar
                if (numAciertos == stringLetra.length) {
                    document.getElementById('introducirLetra').style.display = 'none';
                    document.getElementById('botonComprobar').style.display = 'none';
                    document.getElementById('botonReiniciar').style.display = 'initial';
                    document.getElementById('mensajeFinal').innerHTML = "HAS ACERTADO, ENHORABUENA!!!!!";
                    document.getElementById('mensajeFinal').style.display = 'initial';
                }
            }
        }

        //si despues de recorrer el array no ha encontrado la letra se apunta el fallo y hace visible una letra del ahorcado
        if (letraErronea == false) {
            document.getElementById('celdaAhorcado' + (stringAhorcado.length - numIntentos)).style.display = 'initial';
            numIntentos--;
            document.getElementById('numIntentos').innerHTML = numIntentos + " de 8 intentos";

            document.getElementById('letrasErroneas').innerHTML += letra + ",";

            //cuando se agoten los intentos escondemos los inputs y el boton de comprobar
            //y aparece un mensaje donde pone que se ha fallado la palabra, además de hacer visible el boton de volver a jugar
            if (numIntentos == 0) {
                document.getElementById('introducirLetra').style.display = 'none';
                document.getElementById('botonComprobar').style.display = 'none';
                document.getElementById('botonReiniciar').style.display = 'initial';
                document.getElementById('mensajeFinal').innerHTML = "NO HAS ACERTADO, LA PALABRA ERA: " + palabra;
                document.getElementById('mensajeFinal').style.display = 'initial';
            }
        }
    }

    //borramos el valor del input y lo ponemos en focus para introducir la siguiente letra
    document.getElementById('eligeLetra').value = "";
    document.getElementById('eligeLetra').focus();
}

//funcion para reiniciar el juego
function reiniciarJuego() {
    window.location.reload();
}

