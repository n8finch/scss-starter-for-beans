/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  copy = require('gulp-contrib-copy'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  postcss = require('gulp-postcss'),
  browserSync = require('browser-sync').create(),
  del = require('del');

var config = {
  sassPath: './assets',
};


// browser-sync watched files
// automatically reloads the page when files changed
var browserSyncWatchFiles = [
  './css/*.min.css',
  './js/*.min.js',
  './*.php'
];

// browser-sync options
// see: https://www.browsersync.io/docs/options/
var browserSyncOptions = {
  proxy: "hbsnj.test",
  notify: true
};

// Styles
// gulp.task('styles', function() {
//   return sass('assets/sass/style.scss', { style: 'expanded' })
//   	.pipe(sourcemaps.init(''))
//     .pipe(autoprefixer('last 2 version'))
//     .pipe(sourcemaps.write(''))
//     .pipe(gulp.dest(''))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(cssnano())
//     .pipe(gulp.dest(''))
//     .pipe(notify({ message: 'Styles task complete' }));
// });

// Styles
gulp.task('styles', function() {
  return gulp.src('./assets/sass/**/*.scss')
  	.pipe(sourcemaps.init(''))
	.pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(''))
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(cssnano())
    // .pipe(gulp.dest(''))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(['assets/js/custom.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(''))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(''))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
// gulp.task('images', function() {
//   return gulp.src('src/images/**/*')
//     .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//     .pipe(gulp.dest('dist/images'))
//     .pipe(notify({ message: 'Images task complete' }));
// });

// Clean
// gulp.task('clean', function() {
//   return del(['dist/styles', 'dist/scripts', 'dist/images']);
// });



// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});

// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task('watch-bs', ['browser-sync', 'watch', 'scripts'], function () { });


// Default task
gulp.task('default', function() {
  gulp.start('styles', 'scripts', 'watch');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('assets/sass/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('assets/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  // gulp.watch(['dist/**']).on('change', livereload.changed);

});
