//Pruebas con imports de las clases no funciona correctamente: "TypeError: XX is not a constructor"
/* import Tablas from "./tablasClases.js";
import Comprobar from "./comprobarClases.js"; */

//Import de la funcion reiniciar
import { reiniciarJuego } from "./reiniciar.js";


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
    document.getElementById("clock").style.display = "none";

    // funcion de ayuda para el teclado
    const teclado = document.getElementById("eligeLetra");
    teclado.addEventListener("keyup", function (event) {
        // numero 13 representa el "Enter" para introducir letra
        if (event.keyCode === 13) {
            document.getElementById("botonComprobar").click();
        }
        // bloquea simbolos en el input
        if (!this.value.match(/[A-Za-z]/)) {
            this.value = this.value.replace(/[^A-Za-z]/g, '');
        }
        event.preventDefault();
    });
}

// ARRAY que contiene las palabras que pueden salir
const arrayPalabras = ["Coco", "Luz", "Fuente", "Casa", "Enorme", "Silla", "Ordenador", "Pizarra", "Pantalon", "Fiesta",
    "Parque", "Escaleras", "Videojuegos", "Deporte", "Insecto", "Amistad", "Pulpo", "Lluvia", "Naranja", "Matematicas",
    "Mochila", "Servir", "Deletrear", "Hombre", "Enorme", "Galera", "Prototipo", "Veloz", "Ayuntamiento", "Leon"];

// let que recoge la palabra
let palabra = "";

// const que contiene la palabra AHORCADO
const stringAhorcado = ["A", "H", "O", "R", "C", "A", "D", "O"];

// let que recoge el num de los intentos
let numIntentos = stringAhorcado.length;

// variable que recoge el num de aciertos
let numAciertos = 0;

// let que recoge las letras usadas
let numLetras = [""];

// clase de las tablas Ahorcado y Palabras
class Tablas {
    constructor(longitud) {
        this.long = longitud;
    }

    newTablaAhorcado() {
        // creamos una nueva tabla con la palabra AHORCADO
        const tbl1 = document.createElement('table');
        const tr1 = tbl1.insertRow();
        for (let i = 0; i < stringAhorcado.length; i++) {
            const td1 = tr1.insertCell();
            td1.setAttribute("id", "celdaAhorcado" + i);
            td1.setAttribute("class", "celdaAhorcado");
            td1.appendChild(document.createTextNode(stringAhorcado[i]));
            td1.style.borderBottom = "3px solid #2E2E2E";
            td1.style.display = "none";
        }
        document.getElementById("posicionFallo").appendChild(tbl1);
    }

    newTablaPalabra() {
        // creamos nueva tabla con la palabra a adivinar
        const tbl2 = document.createElement('table');
        const tr2 = tbl2.insertRow();
        for (let i = 0; i < this.long; i++) {
            const td2 = tr2.insertCell();
            td2.setAttribute("id", "celdaLetra" + i);
            td2.setAttribute("class", "celdaLetra");
            td2.appendChild(document.createTextNode(""));
            td2.innerHTML = "_";
            td2.style.padding = "10px";
        }
        document.getElementById("posicionLetra").appendChild(tbl2);
    }
}

// clase de comprobar Intentos, Aciertos...
class Comprobar {
    constructor() {
        // sin necesidad de constructor
    }

    elegirLetra() {
        // recogemos la letra que se introduce
        const letra = document.getElementById("eligeLetra").value;

        // let que crea un array con las letras de la palabra
        let stringLetra = _.split(palabra, "");

        console.log(palabra);

        // let para comprobar si ya se ha introducido la letra anteriormente
        let letraEncontrada = false;

        // recorremos el array con las letras y comprobamos si ya se ha usado la letra
        for (let i = 0; i < numLetras.length; i++) {
            if (letra == numLetras[i]) {
                letraEncontrada = true;
            }
        }

        // si ya se introducio la letra antes vuelve al input
        if (letraEncontrada) {

            alert("Ya has introducido esta letra escoge otra que no hayas elegido");

        } else {

            // si no estaba la letra la introducimos en el array
            numLetras.push(letra);

            // let boolean que nos sirve para incrementar los fallos si no se encuentra la letra
            let letraErronea = false;

            // comprobamos si la letra es correcta o no
            for (let i = 0; i < stringLetra.length; i++) {

                // si encuentra la palabra pone la letra en las casillas y anota los aciertos
                if (_.lowerCase(letra) == _.lowerCase(stringLetra[i])) {
                    letraErronea = true;
                    document.getElementById("celdaLetra" + i).innerHTML = _.upperCase(letra);
                    numAciertos++;
                    
                    // cuando se acierte la palabra escondemos los inputs y el boton de comprobar
                    // y aparece un mensaje donde pone que se ha acertado la palabra, además de hacer visible el boton de volver a jugar
                    if (numAciertos == stringLetra.length) {
                        document.getElementById('introducirLetra').style.display = 'none';
                        document.getElementById('botonComprobar').style.display = 'none';
                        document.getElementById('botonReiniciar').style.display = 'initial';
                        document.getElementById('mensajeFinal').innerHTML = "Has acertado, ENHORABUENA!!!!!";
                        document.getElementById('mensajeFinal').style.display = 'initial';

                        // para el reloj
                        clock.stop();
                    }
                }
            }

            // si despues de recorrer el array no ha encontrado la letra se apunta el fallo y hace visible una letra del ahorcado
            if (letraErronea == false) {
                document.getElementById('celdaAhorcado' + (stringAhorcado.length - numIntentos)).style.display = 'initial';
                numIntentos--;
                document.getElementById('numIntentos').innerHTML = numIntentos + " de 8 intentos";

                document.getElementById('letrasErroneas').innerHTML += letra + ", ";

                // cuando se agoten los intentos escondemos los inputs y el boton de comprobar
                // y aparece un mensaje donde pone que se ha fallado la palabra, además de hacer visible el boton de volver a jugar
                if (numIntentos == 0) {
                    document.getElementById('introducirLetra').style.display = 'none';
                    document.getElementById('botonComprobar').style.display = 'none';
                    document.getElementById('botonReiniciar').style.display = 'initial';
                    document.getElementById('mensajeFinal').innerHTML = "No has acertado, la palabra era: " + palabra;
                    document.getElementById('mensajeFinal').style.display = 'initial';

                    // para el reloj
                    clock.stop();
                }
            }
        }
    }
}

// creamos una funcion para que pueda empezar el juego como tal
function empezarJuego() {

    // coge la palabra del array aleatoriamente
    let posicionLetra = _.random(0, arrayPalabras.length - 1);
    palabra = arrayPalabras[posicionLetra];

    // hacemos visible el div que contiene introducirLetra y el boton comprobar
    document.getElementById("introducirLetra").style.display = "block";
    document.getElementById("letrasErroneas").style.display = "block";
    document.getElementById("clock").style.display = "block";

    // ocultamos el boton de inicio
    document.getElementById("botonIniciar").style.display = "none";
    document.getElementById("reglas").style.display = "none";

    // llamamos a la clase y funciones que crea la clase tablas
    const tabla = new Tablas(palabra.length);
    tabla.newTablaAhorcado();
    tabla.newTablaPalabra();

    // hacemos que haga focus en este evento para que nos lleve al input
    document.getElementById('eligeLetra').focus();
}

// funcion para comprobar con el botón
function comprobarPalabra() {

    // llamamos a la funcion y a la clase comprobar
    const comprobar = new Comprobar(palabra);
    comprobar.elegirLetra();

    // borramos el valor del input y lo ponemos en focus para introducir la siguiente letra
    document.getElementById('eligeLetra').value = "";
    document.getElementById('eligeLetra').focus();
}

//Reloj de flipClock con funcion en jQuery
let clock;
$(document).ready(function () {
    clock = $('#clock').FlipClock({
        clockFace: 'MinuteCounter'
    });
});