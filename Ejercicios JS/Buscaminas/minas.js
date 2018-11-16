window.onload = function () {

    //comenzar juego
    document.getElementById("empezar").addEventListener('click', botonEmpezar, false);
    document.getElementById("reiniciar").addEventListener('click', botonReiniciar, false);
    document.getElementById('ch1').addEventListener('click', tablanovato, false);
    document.getElementById('ch2').addEventListener('click', tablaintermedio, false);
    document.getElementById('ch3').addEventListener('click', tablaexperto, false);


    //boton de reiniciar
    document.getElementById("estilos").style.display = "none";
    document.getElementById("reiniciar").style.display = "none";

    function botonEmpezar() {
        document.getElementById("estilos").style.display = "block";
        document.getElementById("empezar").style.display = "none";
    }

    function tablanovato() {
        const fila = 8;
        const columna = 8;
        const minas = 8;
        creartabla(fila, columna);
        console.log(minas);
        randomMina(minas, columna, fila);
    }

    function tablaintermedio() {
        const fila = 16;
        const columna = 16;
        const minas = 40;
        creartabla(fila, columna);
        console.log(minas);
        //randomMina(minas, columna, fila);
    }

    function tablaexperto() {
        const fila = 16;
        const columna = 31;
        const minas = 99;
        creartabla(fila, columna);
        console.log(minas);
        //randomMina(minas, columna, fila);
    }

    function creartabla(fila, columna) {
        document.getElementById("comienzo").style.display = "none";
        const body = document.getElementsByTagName("body")[0];

        // Crea un elemento <table> y un elemento <tbody>
        const tabla = document.createElement("table");
        const tblBody = document.createElement("tbody");

        // Crea las celdas
        for (let i = 0; i < fila; i++) {
            // Crea las hileras de la tabla
            let fila = document.createElement("tr");

            for (let j = 0; j < columna; j++) {
                // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                // texto sea el contenido de <td>, ubica el elemento <td> al final
                // de la hilera de la tabla
                let columna = document.createElement("td");
                columna.id = i + "" + j;
                fila.appendChild(columna);
                columna.className = "gameCel";
                //columna.addEventListener('click', clicks, false);
            }

            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(fila);

        }

        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tabla);

        tabla.className = "tabla";
        document.getElementById("reiniciar").style.display = "block";
    }

    function randomMina(minas, columna, fila) {

        let celMina = document.getElementById(filRand + "" +colRand).textContent
        for (let i = 0; i < minas; i++) {
            let filRand = Math.floor(Math.random() * fila);
            let colRand = Math.floor(Math.random() * columna);

            celMina = document.getElementById(filRand + "" + colRand);
            fullCel = celMina.style.backgroundImage = "url('img/bombrevealed.gif')";

            if (celMina.style.backgroundImage != fullCel) {
                fullCel;
            } else {
                i--;
            }
            console.log(i);
            console.log(celMina = document.getElementById(filRand + "" + colRand));
        }
        
    }

    /*function clicks(columna, paco) {
        if (columna.id == paco) {
            console.log("Has pulsado una mina");
            //end();
        } else {
            console.log("Has clickado agua");
        }
    }*/
}

function botonReiniciar() {
    window.location.reload();
}

function end() {
    alert("Has perdido");
    botonReiniciar();
}

