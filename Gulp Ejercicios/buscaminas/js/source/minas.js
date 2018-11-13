window.onload = function () {

    //comenzar juego
    document.getElementById("empezar").addEventListener('click', botonEmpezar, false);
    document.getElementById('ch1').addEventListener('click', tablaNovato, false);
    document.getElementById('ch2').addEventListener('click', tablaIntermedio, false);
    document.getElementById('ch3').addEventListener('click', tablaExperto, false);

    //boton de reiniciar
    document.getElementById("reiniciar").addEventListener('click', botonReiniciar, false);
    
    //Ocultamos elementos
    document.getElementById("estilos").style.display = "none";
    document.getElementById("reiniciar").style.display = "none";
    document.getElementById("clock").style.display = "none";

}

//Clase Celdas encargada de colocar minas banderas...
class Celdas {
    constructor() {
        this.mina = false;
        this.numCont = 0;
        this.corX;
        this.corY;
    }

     get coorX(){
        return this.corX;
    }

    get coorY(){
        return this.corY;
    } 
}

//Clase Buscaminas que in cluye todas las funciones para la tabla
class Buscaminas {
    constructor(fila, colum, minas) {
        this.fila = fila;
        this.colum = colum;
        this.minas = minas;
    }

    //Funcion para crear la tabla
    generarTabla() {
        const tablero = document.getElementById("tablero");

        let tabla = document.createElement("table");
        let tblBody = document.createElement("tbody");

        //Colocar las celdas 
        for (let c = 0; c < this.fila; c++) {
            let filas = document.createElement("tr");
            for (let f = 0; f < this.colum; f++) {
                let celda = document.createElement("td");

                celda.id = c + "-" + f;

                this.celda = new Celdas();

                celda.coorX = c;
                celda.coorY = f;

                filas.appendChild(celda);

                celda.style.backgroundImage = "url('./img/blank.gif')";

                celda.addEventListener('click', clickar, false);
                celda.className = "gameCel";

            }
            tblBody.appendChild(filas);
        }

        tabla.appendChild(tblBody);
        tablero.appendChild(tabla);

        tabla.className = "tabla";

        document.getElementById("estilos").style.display = "none";
        document.getElementById("reiniciar").style.display = "block";
        document.getElementById("clock").style.display = "block";
    }

    //Funcion que genera las minas
    generarMinas() {
        for (let f = 0; f < this.minas; f++) {

            let randFil = _.random(0, (this.fila - 1));
            let randColum = _.random(0, (this.colum - 1));

            let celda = document.getElementById(randFil + "-" + randColum);

            if (!celda.mina) {
                celda.innerHTML = "m";
                celda.style.color = "red";
                celda.mina = true;

            } else {
                f--;
            }
        }
    }

    //Funcion que genera num alrededor de la mina
    reparteNumeros() {
        for (let c = 0; c < this.fila; c++) {
            for (let f = 0; f < this.colum; f++) {
                let numCont = 0;
                let celda = document.getElementById(c + "-" + f);

                let celdaDerecha = document.getElementById(c + "-" + (f + 1));
                let celdaIzquierda = document.getElementById(c + "-" + (f - 1));

                let celdaAbajo = document.getElementById((c + 1) + "-" + f);
                let celdaArriba = document.getElementById((c - 1) + "-" + f);

                let celdaDiagonalDerInf = document.getElementById((c + 1) + "-" + (f + 1));
                let celdaDiagonalDerSup = document.getElementById((c - 1) + "-" + (f + 1));

                let celdaDiagonalIzqInf = document.getElementById((c + 1) + "-" + (f - 1));
                let celdaDiagonalIzqSup = document.getElementById((c - 1) + "-" + (f - 1));

                if (!celda.mina) {
                    //Lados
                    if (celdaDerecha == null) {

                    } else {
                        if (celdaDerecha.mina) {
                            numCont++;
                        }
                    }
                    if (celdaIzquierda == null) {

                    } else {
                        if (celdaIzquierda.mina) {
                            numCont++;
                        }
                    }

                    //Arriba/Abajo
                    if (celdaAbajo == null) {

                    } else {
                        if (celdaAbajo.mina) {
                            numCont++;
                        }
                    }
                    if (celdaArriba == null) {

                    } else {
                        if (celdaArriba.mina) {
                            numCont++;
                        }
                    }

                    //Diagonales Der 
                    if (celdaDiagonalDerInf == null) {

                    } else {
                        if (celdaDiagonalDerInf.mina) {
                            numCont++;
                        }
                    }
                    if (celdaDiagonalDerSup == null) {

                    } else {
                        if (celdaDiagonalDerSup.mina) {
                            numCont++;
                        }
                    }

                    //Diagonales Izq
                    if (celdaDiagonalIzqInf == null) {

                    } else {
                        if (celdaDiagonalIzqInf.mina) {
                            numCont++;
                        }
                    }
                    if (celdaDiagonalIzqSup == null) {

                    } else {
                        if (celdaDiagonalIzqSup.mina) {
                            numCont++;
                        }
                    }
                    celda.numCont = numCont;
                }
            }
        }
    }
}

//Llamamos a los Estilos de Juego
function tablaNovato() {
    jueTab = new Buscaminas(8, 8, 10);
    jueTab.generarTabla();
    jueTab.generarMinas();
    jueTab.reparteNumeros();

}

function tablaIntermedio() {
    jueTab = new Buscaminas(16, 16, 40);
    jueTab.generarTabla();
    jueTab.generarMinas();
    jueTab.reparteNumeros();

}

function tablaExperto() {
    jueTab = new Buscaminas(16, 30, 99);
    jueTab.generarTabla();
    jueTab.generarMinas();
    jueTab.reparteNumeros();
}

//Funcion que permite clicar y pone la imagen
function clickar() {
    const celClick = document.getElementById(this.id);

    if (event.target.mina) {
        celClick.style.backgroundImage = "url('./img/bombdeath.gif')";
        finJuego();
    } else {
        celClick.style.backgroundImage = "url('./img/open" + celClick.numCont + ".gif')";
    }
}

//Empezar el juego
function botonEmpezar() {
    document.getElementById("estilos").style.display = "block";
    document.getElementById("empezar").style.display = "none";
}

//Acaba el juego
function finJuego() {
    alert("Has perdido!!!");
    botonReiniciar();
}

//Reinicio del juego
function botonReiniciar() {
    window.location.reload();
}

//Reloj de flipClock con funcion en jQuery
let clock;
$(document).ready(function () {
    clock = $('#clock').FlipClock({
        clockFace: 'MinuteCounter'
    });
});