/* Ejercicio practica LODASH

_.startsWith([string=''], [target], [position=0]): Comprueba si el 'string' empieza con la cadena dada.

_.endsWith([string=''], [target], [position=string.length]): Comprueba si el 'string' termina con la cadena dada.

.forEach: Ejecuta la función una vez por cada elemento del array.
*/


const palabras = ["tanque", "hombre", "turista", "diez", "lapiz", "coche", "marbel", "soneto", "pensamiento", "tatuaje", "atomico"];

console.log("Palabras que empiezan por t");
palabras.forEach( i => {

    if (_.startsWith(i, 't')) {
        console.log(i);
    }
});

console.log("Palabras que acaban por o");
palabras.forEach( i => {

    if (_.endsWith(i, 'o')) {
        console.log(i);
    }
});