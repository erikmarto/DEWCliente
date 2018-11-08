window.onload = function () {

    //comenzar juego
    document.getElementById("empezar").addEventListener('click', botonEmpezar, false);
    document.getElementById('ch1').addEventListener('click', tablaNovato, false);
    document.getElementById('ch2').addEventListener('click', tablaIntermedio, false);
    document.getElementById('ch3').addEventListener('click', tablaExperto, false);

    //boton de reiniciar
    document.getElementById("reiniciar").addEventListener('click', botonReiniciar, false);
    document.getElementById("estilos").style.display = "none";
    document.getElementById("reiniciar").style.display = "none";
    document.getElementById("clock").style.display = "none";

}

class Celda {
    constructor() {
        this.status = "unclicked";
        this.bomba = false;
        this.bandera = false;
        this.numeroContiguo = 0;
        this._coorX;
        this._coorY;
    }

     get coorX(){
        return this._coorX;
    }

    get coorY(){
        return this._coorY;
    } 
}

//Clase tablero
class Buscaminas {
    constructor(fil, col, numBombas) {
        this.fil = fil;
        this.col = col;
        this.numBombas = numBombas;
    }

    // funcion para crear la tabla
    crearTabla() {
        const divTablero = document.getElementById("tablero");

        let tabla = document.createElement("table");
        let tblBody = document.createElement("tbody");

        // Crea las celdas
        for (let i = 0; i < this.fil; i++) {
            let filas = document.createElement("tr");
            for (let j = 0; j < this.col; j++) {
                let celda = document.createElement("td");

                celda.id = i + "-" + j;

                this.celda = new Celda();

                celda.coorX = i;
                celda.coorY = j;

                filas.appendChild(celda);

                celda.style.backgroundImage = "url('./img/blank.gif')";

                //Clicks en celdas
                celda.addEventListener('click', clicks, false);
                celda.className = "gameCel";
                //console.log(celda.coorX, celda.coorY);
            }
            tblBody.appendChild(filas);
        }

        tabla.appendChild(tblBody);
        divTablero.appendChild(tabla);

        tabla.setAttribute("border", 2);
        tabla.className = "tabla";

        document.getElementById("estilos").style.display = "none";
        document.getElementById("reiniciar").style.display = "block";
        document.getElementById("clock").style.display = "block";
    }

    //Funcion para generar bombas
    generarMinas() {
        for (let j = 0; j < this.numBombas; j++) {

            //Aleatorios creados con metodos de lodash
            let rndFilas = _.random(0, (this.fil - 1));
            let rndColumnas = _.random(0, (this.col - 1));

            let celda = document.getElementById(rndFilas + "-" + rndColumnas);

            if (!celda.bomba) {
                celda.innerHTML = "+";
                celda.bomba = true;

            } else {
                j--;
            }
        }
    }

    //Funcion para poner los numero alrededor de las minas 
    reparteNumeros() {
        //La i son las filas y la j son las columnas
        for (let i = 0; i < this.fil; i++) {
            for (let j = 0; j < this.col; j++) {
                let numeroContiguo = 0;
                let celda = document.getElementById(i + "-" + j);

                let celdaDerecha = document.getElementById(i + "-" + (j + 1));
                let celdaIzquierda = document.getElementById(i + "-" + (j - 1));

                let celdaAbajo = document.getElementById((i + 1) + "-" + j);
                let celdaArriba = document.getElementById((i - 1) + "-" + j);

                let celdaDiagonalDerInf = document.getElementById((i + 1) + "-" + (j + 1));
                let celdaDiagonalDerSup = document.getElementById((i - 1) + "-" + (j + 1));

                let celdaDiagonalIzqInf = document.getElementById((i + 1) + "-" + (j - 1));
                let celdaDiagonalIzqSup = document.getElementById((i - 1) + "-" + (j - 1));

                if (!celda.bomba) {
                    //Casos en los que sea nula la casilla 
                    //Lados
                    if (celdaDerecha == null) {

                    } else {
                        if (celdaDerecha.bomba) {
                            numeroContiguo++;
                        }
                    }
                    if (celdaIzquierda == null) {

                    } else {
                        if (celdaIzquierda.bomba) {
                            numeroContiguo++;
                        }
                    }

                    //Arriba abajo
                    if (celdaAbajo == null) {

                    } else {
                        if (celdaAbajo.bomba) {
                            numeroContiguo++;
                        }
                    }
                    if (celdaArriba == null) {

                    } else {
                        if (celdaArriba.bomba) {
                            numeroContiguo++;
                        }
                    }

                    //Diagonales derechas 
                    if (celdaDiagonalDerInf == null) {

                    } else {
                        if (celdaDiagonalDerInf.bomba) {
                            numeroContiguo++;
                        }
                    }
                    if (celdaDiagonalDerSup == null) {

                    } else {
                        if (celdaDiagonalDerSup.bomba) {
                            numeroContiguo++;
                        }
                    }

                    //Diagonales izquierdas
                    if (celdaDiagonalIzqInf == null) {

                    } else {
                        if (celdaDiagonalIzqInf.bomba) {
                            numeroContiguo++;
                        }
                    }
                    if (celdaDiagonalIzqSup == null) {

                    } else {
                        if (celdaDiagonalIzqSup.bomba) {
                            numeroContiguo++;
                        }
                    }

                    celda.numeroContiguo = numeroContiguo;
                }
            }
        }
    }
}

function tablaNovato() {
    jueTab = new Buscaminas(8, 8, 10);
    jueTab.crearTabla();
    jueTab.generarMinas();
    jueTab.reparteNumeros();

}

function tablaIntermedio() {
    jueTab = new Buscaminas(16, 16, 40);
    jueTab.crearTabla();
    jueTab.generarMinas();
    jueTab.reparteNumeros();

}

function tablaExperto() {
    jueTab = new Buscaminas(16, 30, 99);
    jueTab.crearTabla();
    jueTab.generarMinas();
    jueTab.reparteNumeros();
}


function clicks() {
    const celdaClick = document.getElementById(this.id);

    if (event.target.bomba) {
        //console.log("Has clickado una bomba");
        celdaClick.style.backgroundImage = "url('./img/bombdeath.gif')";
        endGame();
    } else {
        celdaClick.style.backgroundImage = "url('./img/open" + celdaClick.numeroContiguo + ".gif')";
    }
}

//empezar a jugar
function botonEmpezar() {
    document.getElementById("estilos").style.display = "block";
    document.getElementById("empezar").style.display = "none";
}

// acabar juego
function endGame() {
    alert("Perdiste" );
    botonReiniciar();
}

function botonReiniciar() {
    window.location.reload();
}

//Reloj de flipClock con funcion en jQuery
let clock;
$(document).ready(function () {
    clock = $('#clock').FlipClock({
        clockFace: 'MinuteCounter'
    });
    console.log(document);
});

