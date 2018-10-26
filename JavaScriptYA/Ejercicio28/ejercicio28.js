window.onload = function() {
    document.getElementById("botonSeleccionado").onclick = seleccionado;

    function seleccionado() {
        var deportes = '';
        if (document.getElementById("checkbox1").checked){
            deportes = deportes + 'Fútbol ';
        }
        if (document.getElementById("checkbox2").checked){
            deportes = deportes + 'Básquet ';
        }
        if (document.getElementById("checkbox3").checked){
            deportes = deportes + 'Tenis';
        }
        alert("Deportes seleccionados: " + deportes);
    }
}