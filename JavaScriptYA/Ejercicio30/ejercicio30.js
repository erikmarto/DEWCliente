window.onload = function(){
    document.getElementById("botonVerificar").onclick = verificar;

    function verificar(){
        var name = document.getElementById('nombre').value;
        var correo = document.getElementById('mail').value;
        var texto = document.getElementById('comentario').value;
        alert("Nombre: " + name + '\n' + "Correo: " + correo + '\n' + "Comentario: " + texto);
    }
}