// from https://gist.github.com/danharper/3ca2273125f500429945

var con = console;

var babel = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var jade = require('gulp-jade');
var pug = require('gulp-pug');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var deploy = './deploy/';

function compile(watch) {

  var bundler = browserify(['./src/js/app.js'], { debug: true }).transform(babel);

  function rebundle() {
    function handleError(err) {
      console.error(err);
      this.emit('end');
    }

    bundler.bundle()
      .on('error', handleError)
      .pipe(source('whitenoise.js'))
      .pipe(buffer())
      // .pipe(uglify())
      // .pipe(sourcemaps.init({ loadMaps: true })).pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(deploy + "/js"));

    compileJade();
    // compileStylus();
    // copyPHP();
    // copyImages();

  }

  if (watch) {

    gulp.watch('src/**/*.pug', ['compileJade']);
    gulp.watch('src/css/*.styl', ['compileStylus']);
    gulp.watch(['src/php/**/*'], {dot: true}, ['copyPHP']);
    gulp.watch(['src/metabolictrial/images/**/*'], {}, ['copyImages']);
    gulp.watch(['src/inattentiontrial/images/**/*'], {}, ['copyImages']);

    bundler = watchify(bundler);
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  con.log("watch");
  return compile(true);
};

function compileJade() {
  con.log("compileJade");
  return gulp.src('./src/pug/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest(deploy));

  // return gulp.src('src/*.jade')
  //   .pipe(jade({
  //     pretty: true,
  //     data: {
  //       site: "site"
  //     }
  //   }))
  //   .pipe(gulp.dest(deploy));
}

// function compileStylus(site) {
//   return gulp.src('src/css/*.styl')
//     .pipe(stylus({
//       compress: true
//     }))
//     .pipe(gulp.dest('deploy/' + site + '/css/'));
// }

// function copyImages(site) {
//   return gulp.src(['src/' + site + '/images/**/*']).pipe(gulp.dest('deploy/' + site + '/images/'));
// }

gulp.task('compileJade', compileJade);
// gulp.task('compileStylus', compileStylus);
// gulp.task('copyImages', copyImages);
gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);