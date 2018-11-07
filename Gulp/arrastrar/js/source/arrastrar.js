window.onload = function(){
    document.getElementById("divCir").addEventListener('ondragover', allowDrop);
    document.getElementById("divCir").addEventListener('ondrop', drop);
    document.getElementById("dragCir").addEventListener('ondragstart', drag);
    
    document.getElementById("empezar").addEventListener('click', empezar, false);

    document.getElementById("container").style.display = "none";

    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    
    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

}



empezar = () =>{
    document.getElementById("container").style.display = "block";
    document.getElementById("empezar").style.display = "none";
}



