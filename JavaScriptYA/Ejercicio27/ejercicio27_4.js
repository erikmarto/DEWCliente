window.onload=function(){
    document.getElementById("botonVerificar").onclick = verificar;
    function verificar(){
        var correctas = 0;
        var ele1 = document.getElementById('pregunta1');
        var ele2 = document.getElementById('pregunta2');
        var ele3 = document.getElementById('pregunta3');
        var ele4 = document.getElementById('pregunta4');
        if (ele1.options[ele1.selectedIndex].value == 3){
          correctas++;
        }
        if (ele2.options[ele2.selectedIndex].value == 1){
          correctas++;
        }
        if (ele3.options[ele3.selectedIndex].value == 2){
          correctas++;
        }
        if (ele4.options[ele4.selectedIndex].value == 2){
          correctas++;
        }
        alert('Cantidad de respuestas correctas: ' + correctas);
      }
}
