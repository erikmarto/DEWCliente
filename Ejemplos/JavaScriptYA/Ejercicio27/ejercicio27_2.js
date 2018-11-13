window.onload=function(){
    document.getElementById("botonCalcular").onclick = calcularPresupuesto;
    
    function calcularPresupuesto(){
    var ele1 = document.getElementById('procesador').options[document.getElementById('procesador').selectedIndex].value;
    var ele2 = document.getElementById('monitor').options[document.getElementById('monitor').selectedIndex].value;
    var ele3 = document.getElementById('discoduro').options[document.getElementById('discoduro').selectedIndex].value;
    ele1 = parseInt(ele1);
    ele2 = parseInt(ele2);
    ele3 = parseInt(ele3);
    var suma = ele1 + ele2 + ele3;
    document.getElementById('resultado').value = suma;
    }
}