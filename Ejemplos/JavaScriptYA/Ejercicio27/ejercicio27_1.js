window.onload=function(){
    document.getElementById('pizza').onchange = mostrarSeleccionPizza;

    function mostrarSeleccionPizza(){
        this.options[document.getElementById('pizza').selectedIndex].value;
        alert(document.getElementById('pizza').value);
    }
}

