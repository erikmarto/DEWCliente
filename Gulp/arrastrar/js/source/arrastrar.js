window.onload = function(){
    document.getElementById("divCir").ondrop = drop;
    document.getElementById("divCir").ondragover = allowDrop;
    document.getElementById("dragCir").addEventListener("ondragstart", drag, false);
}

allowDrop = (ev) => {
    ev.preventDefault();
}

drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
}

drop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

class Figuras{
    constructor(){
        this.circulo = false;
        this.triangulo = false;
        this.cuadrado = false;
    }
}
