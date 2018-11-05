export default class Tablas {
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
            td1.style.borderBottom = "thick solid #2E2E2E";
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
            td2.style.borderBottom = "thick solid #2E2E2E";
            td2.style.width = "30px";
        }
        document.getElementById("posicionLetra").appendChild(tbl2);
    }
}