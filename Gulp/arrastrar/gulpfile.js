/*
* Dependencias
*/

var gulp = require('gulp');
var notify = require('gulp-notify');
var sass = require('gulp-sass');

//CSS A SCSS
//Tarea para compilar archivos sass a css
gulp.task('scss', function () {

  //Ruta de la carpeta sass apuntando a los archivos `.scss`
   return gulp.src('./css/scss/*.scss') 
  
  //Compila los archivos `.scss` y muestra posibles errores
    .pipe(sass().on('error', sass.logError))  
  
  //Carpeta donde se guardaran los archivos `.css` compilado
    .pipe(gulp.dest('./css/dist'))
  
  //Mensaje gracias al plugin `gulp-notify`
    .pipe(notify("Tarea scss terminada!"));
  });
  
  //Vuelve a ejecutar la tarea cuando se modifica algún archivo 
  gulp.task('watch', function(){
       gulp.watch('./css/scss/*', ['scss']);
  });
  
  //Tarea por defecto
    gulp.task('default',['watch', 'scss']);


/* var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var cleanCSS = require('gulp-clean-css');


//COMPRIMIR EN TODO JAVASCRIPT
* Configuración de la tarea 'demo'
gulp.task('demo', function () {
     gulp.src('js/source/*.js')
     .pipe(concat('todo.js'))
     .pipe(uglify())
     .pipe(gulp.dest('js/build'))
});

//COMPRIMIR CSS
//Tarea para comprimir archivos css
gulp.task('comprimir-css', function() {

//Ruta de la carpeta css apuntando a los archivos `.css`
 return gulp.src('css/*.css')

//Comprime los archivos `.css`
  .pipe(cleanCSS({compatibility: 'ie8'}))

//Carpeta donde se guardará el archivo `.css` comprimido
  .pipe(gulp.dest('css/dist'))
}); */