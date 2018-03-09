var gulp = require('gulp'), gutil = require('gulp-util');;
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin')

gulp.task('default', ['watch']);
gulp.task('watch', function() {
  livereload.listen();
//  gulp.watch('img/*', ['imgmin']);
  gulp.watch('src/img/**/*', ['imgmin'])
  gulp.watch('src/**/*.php', ['html'])
  gulp.watch('src/js/*.js', ['minify-js']);
  gulp.watch('src/less/*.less', ['compileLess']);
});

gulp.task('compileLess', function(cb){
 
  return gulp.src(['src/less/*'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', function(err){
      gutil.log(err);
      this.emit('end');
    })
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
    .pipe(rename({suffix:'.min'}))
    .pipe(cleanCSS({compatibility: '*',level:2}))
    .pipe(gulp.dest('dist/css'))
    .pipe(sourcemaps.write('maps'));
});
gulp.task('minify-js',function (cb) {
  pump([
        sourcemaps.init(),
        gulp.src(['src/js/*.js']),
       // rename({suffix:'-'+G_jsHash}),
        gulp.dest('dist/js'),
        livereload(),
        uglify(),
        rename({suffix:'.min'}),
        sourcemaps.write('maps'),
        gulp.dest('dist/js')
    ],
    cb
  );
});
gulp.task('html', function(){
  return gulp.src('src/**/*.php')
  .pipe(gulp.dest('dist'))
  .pipe(livereload());
});
gulp.task('imgmin', function(){
  return gulp.src('src/img/**/*')
  .pipe(changed('dist/img/'))
  .pipe(imagemin({options:{verbose:true}}))
  .pipe(gulp.dest('dist/img/'))
});