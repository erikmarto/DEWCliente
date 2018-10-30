export default class Comprobar {
    constructor() {

    }
    elegirLetra() {
        // recogemos la letra que se introduce
        const letra = document.getElementById("eligeLetra").value;

        // let que crea un array con las letras de la palabra
        let stringLetra = _.split(palabra, "");

        // let para comprobar si ya se ha introducido la letra anteriormente
        let letraEncontrada = false;

        // recorremos el array con las letras y comprobamos si ya se ha usado la letra
        for (let i = 0; i < numLetras.length; i++) {
            if (letra == numLetras[i]) {
                letraEncontrada = true;
            }
        }

        // si ya se introducio la letra antes vuelve al input
        if (letraEncontrada) {
            
                alert("Ya has introducido esta letra escoge otra que no hayas elegido");

        } else {
            
            // si no estaba la letra la introducimos en el array
            numLetras.push(letra);

            // let boolean que nos sirve para incrementar los fallos si no se encuentra la letra
            let letraErronea = false;

            // comprobamos si la letra es correcta o no
            for (let i = 0; i < stringLetra.length; i++) {

                // si encuentra la palabra pone la letra en las casillas y anota los aciertos
                if (_.lowerCase(letra) == _.lowerCase(stringLetra[i])) {
                    letraErronea = true;
                    document.getElementById("celdaLetra" + i).innerHTML = _.upperCase(letra);
                    numAciertos++;

                    // cuando se acierte la palabra escondemos los inputs y el boton de comprobar
                    // y aparece un mensaje donde pone que se ha acertado la palabra, además de hacer visible el boton de volver a jugar
                    if (numAciertos == stringLetra.length) {
                        document.getElementById('introducirLetra').style.display = 'none';
                        document.getElementById('botonComprobar').style.display = 'none';
                        document.getElementById('botonReiniciar').style.display = 'initial';
                        document.getElementById('mensajeFinal').innerHTML = "Has acertado, ENHORABUENA!!!!!";
                        document.getElementById('mensajeFinal').style.display = 'initial';
                        clock.stop();
                    }
                }
            }

            // si despues de recorrer el array no ha encontrado la letra se apunta el fallo y hace visible una letra del ahorcado
            if (letraErronea == false) {
                document.getElementById('celdaAhorcado' + (stringAhorcado.length - numIntentos)).style.display = 'initial';
                numIntentos--;
                document.getElementById('numIntentos').innerHTML = numIntentos + " de 8 intentos";

                document.getElementById('letrasErroneas').innerHTML += letra + ",";

                // cuando se agoten los intentos escondemos los inputs y el boton de comprobar
                // y aparece un mensaje donde pone que se ha fallado la palabra, además de hacer visible el boton de volver a jugar
                if (numIntentos == 0) {
                    document.getElementById('introducirLetra').style.display = 'none';
                    document.getElementById('botonComprobar').style.display = 'none';
                    document.getElementById('botonReiniciar').style.display = 'initial';
                    document.getElementById('mensajeFinal').innerHTML = "No has acertado, la palabra era: " + palabra;
                    document.getElementById('mensajeFinal').style.display = 'initial';
                    clock.stop();
                }
            }
        }
    }
}