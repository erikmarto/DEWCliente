window.onload=function(){
    this.document.getElementById('botonCalcular').onclick = calcularPresupuesto;

    function calcularPresupuesto(){
        var precio = document.getElementById('pizza').value;
        precio = parseInt(precio);
        var cantidad = document.getElementById('cantidad').value;
        cantidad = parseInt(cantidad);
        var total = precio*cantidad;
        alert(total);
    }
}

