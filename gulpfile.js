// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
notify = require('gulp-notify');
var file = require('gulp-file');
var livereload = require('gulp-livereload');
var download = require('gulp-download-stream');
var browserSync = require('browser-sync').create();
//=================================================//

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "getbeansio.local",
		port: 8000,
    });
});

// Styles
gulp.task('styles', function() {
  return gulp.src('./assets/sass/style.scss')
  	.pipe(sourcemaps.init(''))
	.pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(''))
	.pipe(browserSync.stream())
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  gulp.src('assets/js/*.js')
  .pipe(concat('app.js'))
  // .pipe(uglify())
  .pipe(gulp.dest('assets'))
  .pipe(browserSync.stream())
  .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('watch', function() {

  gulp.watch('assets/sass/**/**', [ 'styles' ])
  gulp.watch('assets/js/*', ['scripts'])


});


// JS Hint
gulp.task('hint', function() {
  return gulp.src('js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('default', ['styles', 'scripts', 'browser-sync', 'watch']);
