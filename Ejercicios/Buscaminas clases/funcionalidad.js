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

}

class Celda {
    constructor() {
        this.status = "unclicked";
        this.bomba = false;
    }
}

//Clase tablero
class Buscaminas {
    constructor(fila, colum, numMinas) {
        this.fila = fila;
        this.colum = colum;
        this.numMinas = numMinas;
    }

    // funcion para crear la tabla
    crearTabla() {
        const tablero = document.getElementById("tablero");

        let tabla = document.createElement("table");
        let tblBody = document.createElement("tbody");

        // Crea las celdas
        for (let i = 0; i < this.fila; i++) {
            let fil = document.createElement("tr");

            for (let j = 0; j < this.colum; j++) {
                let cel = document.createElement("td");

                cel.id = i + "" + j;

                this.cel = new Celda();

                fil.appendChild(cel);

                //cel.style.backgroundImage = "url('img/blank.gif')";
                cel.className = "gameCel";

            }
            tblBody.appendChild(fil);

        }

        tabla.appendChild(tblBody);
        tablero.appendChild(tabla);

        tabla.setAttribute("border", 2);

        tabla.className = "tabla";
        
        document.getElementById("estilos").style.display = "none";
        document.getElementById("reiniciar").style.display = "block";
    }

    generarMinas(){
        
        for (let i = 0; i < this.numMinas; i++) {

            let filRand = Math.floor((Math.random() * this.fila));
            let colRand = Math.floor((Math.random() * this.colum));
            let celda = document.getElementById(filRand + "-" + colRand);
            console.log(this.numMinas);

            if (!celda.bomba) {
                celda.innerHTML = "*";  
                celda.bomba = true;

            } else {
                i--;
            } 
        }
    }

    //Funcion para poner los numero alrededor de las minas 
    /*reparteNumeros() {
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
                
                if(!celda.bomba){
                    //Casos en los que sea nula la casilla 
                    //Lados
                    if(celdaDerecha == null){
                    
                    } else{
                        if (celdaDerecha.bomba) {
                            numeroContiguo++;
                        }                        
                    }
                    if(celdaIzquierda == null){
        
                    } else {
                        if (celdaIzquierda.bomba) {
                            numeroContiguo++;
                        } 
                    }
                    
                    //Arriba abajo
                    if(celdaAbajo == null){
                        
                    } else {
                        if (celdaAbajo.bomba) {
                            numeroContiguo++;
                        }
                    }
                    if(celdaArriba == null){
                        
                    }else {
                        if (celdaArriba.bomba) {
                            numeroContiguo++;
                        }
                    }
                    
                    //Diagonales derechas 
                    if(celdaDiagonalDerInf == null){
                        
                    } else {
                        if (celdaDiagonalDerInf.bomba) {
                            numeroContiguo++;
                        }
                    }
                    if(celdaDiagonalDerSup == null){
                        
                    } else {
                        if (celdaDiagonalDerSup.bomba) {
                            numeroContiguo++;
                        }
                    }
                    
                    //Diagonales izquierdas
                    if(celdaDiagonalIzqInf == null){
                        
                    } else {
                        if (celdaDiagonalIzqInf.bomba) {
                            numeroContiguo++;
                        }
                    }
                    if(celdaDiagonalIzqSup == null){
                        
                    } else {
                        if (celdaDiagonalIzqSup.bomba) {
                            numeroContiguo++;
                        }
                    }

                    celda.numeroContiguo = numeroContiguo;
                }   
            }
        }
    }*/
}

function tablaNovato() {
    jueTab = new Buscaminas(8, 8, 10);
    jueTab.crearTabla();
    jueTab.generarMinas();
    ///jueTab.reparteNumeros();
    
}

function tablaIntermedio() {
    jueTab = new Buscaminas(16, 16, 40);
    jueTab.crearTabla();
    jueTab.generarMinas();
    //jueTab.reparteNumeros();
    
}

function tablaExperto() {
    jueTab = new Buscaminas(16, 30, 99);
    jueTab.crearTabla();
    jueTab.generarMinas();
    //jueTab.reparteNumeros();
}

function botonEmpezar() {
    document.getElementById("estilos").style.display = "block";
    document.getElementById("empezar").style.display = "none";
}

// acabar juego
function endGame(){
    alert("Perdiste")
    reiniciar();
}

function botonReiniciar() {
    window.location.reload();
}