window.onload = function(){
    document.getElementById("divCir").ondrop = drop;
    document.getElementById("divCir").ondragover = allowDrop;
    document.getElementById("dragCir").ondragstart = drag;
    document.getElementById("empezar").addEventListener("click", empezar, false);
    document.getElementById("container").style.display = "none";
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

empezar = () =>{
    document.getElementById("container").style.display = "block";
    document.getElementById("empezar").style.display = "none";
}

