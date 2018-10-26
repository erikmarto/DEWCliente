/*
* Dependencias
*/
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;

/*
* Configuración de la tarea 'demo'
*/
gulp.task('demo', function () {
     gulp.src('js/source/*.js')
     .pipe(concat('todo.js'))
     .pipe(uglify())
     .pipe(gulp.dest('js/build/'))
});

//JAVASCRIPT
var pump = require('pump');

//Tarea para comprimir archivos js
gulp.task('compress-js', function (cb) {
 pump([

//Ruta de la carpeta apuntando a los archivos `.js`
  gulp.src('js/*.js'),   uglify(), //Comprime los archivos `.js`
  gulp.dest('dist')//Carpeta donde se guardará el archivo `.js` comprimido
   ],
    cb
  );
});

//Vuelve a ejecutar la tarea cuando se modifica algún archivo 
gulp.task('watch', function(){
      gulp.watch('./js/**/*', ['compress-js']);
});

//Tarea por defecto
gulp.task('default',['watch', 'compress-js']);

//CSS a SCSS
var sass = require('gulp-sass');
var notify = require('gulp-notify');

//Tarea para compilar archivos sass a css
gulp.task('sass', function () {

//Ruta de la carpeta sass apuntando a los archivos `.scss`
 return gulp.src('./css/scss/**/*.scss') 

//Compila los archivos `.scss` y muestra posibles errores
  .pipe(sass().on('error', sass.logError))  

//Carpeta donde se guardaran los archivos `.css` compilado
 .pipe(gulp.dest('./css/css'))

//Mensaje gracias al plugin `gulp-notify`
.pipe(notify("Tarea scss terminada!"));
});

//Vuelve a ejecutar la tarea cuando se modifica algún archivo 
gulp.task('watch', function(){
     gulp.watch('./sass/**/*', ['sass']);
});

//Tarea por defecto
  gulp.task('default',['watch', 'sass']);
