/* 
    _.find --> necesita dos parametros, uno es el array y
  otro es una funcion con lo que deseas que busque en él.
  Lo que devuelve es el primer valor que coincide con lo 
  que le has puesto.
        (    _.find(array, funtion(){}   )

    _.findLast --> hace lo mismo pero en vez de devolverte el 
  primero te devuelve el último que coincide. 
  
*/
 
window.onload = function(){
    document.getElementById('botonFiltrar').addEventListener('click',filtrarEdad, false);
    document.getElementById('botonFiltrarNombre').addEventListener('click',filtrarNombre, false);
}

    // array personas 
var personas = [{nombre:'rommel', edad:18, nacionalidad: 'Ecuador'},{nombre:'david', edad:22, nacionalidad: 'Ecuador'},
                    {nombre:'adrian', edad:20, nacionalidad: 'Espanya'},{nombre:'aron', edad:11, nacionalidad: 'Italia'},
                    {nombre:'santiago', edad:5, nacionalidad: 'EEUU'},{nombre:'emiliano', edad:25, nacionalidad: 'Espanyool'},
                    {nombre:'nick', edad:30, nacionalidad: 'Espanya'},{nombre:'michael', edad:28, nacionalidad: 'Francia'},
                    {nombre:'marcos', edad:3, nacionalidad: 'Espanya'},{nombre:'juan', edad:24, nacionalidad: 'Espanya'},
                    {nombre:'minguito', edad:33, nacionalidad: 'Africana'},{nombre:'nada', edad:40,nacionalidad: 'Espanya'}];
var personasOrdenado = _.sortBy(personas, ['nombre', 'edad']);
for (const persona of personasOrdenado) {
    document.write(persona.nombre+' - '+persona.edad+' - '+persona.nacionalidad+'<hr>');
}


    //input Filtrar edad
var busqueda = document.createElement('input');
busqueda.id = 'filtroEdad';
var botonBusqueda = document.createElement('button');
botonBusqueda.id = 'botonFiltrar';
botonBusqueda.textContent = 'Filtrar';
document.write('Filtrar por edad : ');
document.body.appendChild(busqueda);
document.body.appendChild(botonBusqueda);
document.write('<br><br>');


    //input Filtrar nombre
var busqueda = document.createElement('input');
busqueda.id = 'filtroNombre';
var botonBusqueda = document.createElement('button');
botonBusqueda.id = 'botonFiltrarNombre';
botonBusqueda.textContent = 'Filtrar';
document.write('Filtrar por nombre : ');
document.body.appendChild(busqueda);
document.body.appendChild(botonBusqueda);


const filtrarEdad = () =>{
    var valor = document.getElementById('filtroEdad').value;
    var personasFiltradas = _.find(personas, function(p){return p.edad==valor;})
    document.write(personasFiltradas.nombre+' - '+personasFiltradas.edad+' - '+personasFiltradas.nacionalidad+'<hr>');
    var reiniciar = document.createElement('a');
    reiniciar.textContent= 'REINIAR';
    reiniciar.href= ' ';
    document.body.appendChild(reiniciar);
}

const filtrarNombre = () =>{
    var valor = document.getElementById('filtroNombre').value;
    var personasFiltradas = _.find(personas, function(p){return p.nombre==valor;})
    document.write(personasFiltradas.nombre+' - '+personasFiltradas.edad+' - '+personasFiltradas.nacionalidad+'<hr>');
    var reiniciar = document.createElement('a');
    reiniciar.textContent= 'REINIAR';
    reiniciar.href= ' ';
    document.body.appendChild(reiniciar);
}