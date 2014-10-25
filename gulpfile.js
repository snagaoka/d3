var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    less = require('gulp-less'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    express = require('express'),
    server = express(),
    livereload = require('gulp-livereload'),
    connectLivereload = require('connect-livereload'),
    lr = require('connect-livereload'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    livereloadport = 35729,
    serverport = 3000;

// Project paths
var paths = {
  less: 'assets/less/styles.less',
  js: 'assets/js/**/*.js',
  dist: 'public/'
};

// Growl error messages
function onError(err) {
  var errorMessage = "[" + err.fileName.toString() + ":" + err.lineNumber.toString() + "]";
  console.log(errorMessage);
  notify.onError(err.message)(err); // for growl
  this.emit('end');
}

// Copy bower files
gulp.task('bower', function() {
  gulp.src(mainBowerFiles())
    .pipe(gulp.dest(paths.dist + 'lib'));
});

// Uglify javascript
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(plumber(onError))
    .pipe(sourcemaps.init())
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(paths.dist + 'js'))
      .pipe(uglify())
      .pipe(rename('scripts.min.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.dist + 'js'));
});

// Compile less to css and auto prefix
gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(plumber(onError))
    .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(prefix())
      .pipe(gulp.dest(paths.dist + 'css'))
      .pipe(minify())
      .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.dist + 'css'));
});

// Copy index.html to public
gulp.task('html', function() {
  return  gulp.src('./index.html')
    .pipe(gulp.dest(paths.dist));
});

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch('index.html', ['html']);
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ['js']);

  gulp.watch([
    paths.dist + '**/*'
  ]).on('change', function(file) {
    livereload.changed(file.path);
  });
});

// Start server on port `serverport` and connect livereload
gulp.task('serve', function() {

  server.use(connectLivereload({
    port: livereloadport
  }));
  server.use(express.static(paths.dist));

  server.listen(serverport);
});

// Build and Deploy task
gulp.task('build', ['less', 'html', 'js', 'bower']);

// Default task
gulp.task('default', ['build', 'serve', 'watch']);
