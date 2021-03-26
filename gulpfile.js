const gulp = require('gulp')
const del = require('del');
const concat = require('gulp-concat');
const ndjson = require('ndjson')

gulp.task('js', function(done) { 
  gulp.src('models/**.json')
    .pipe(concat('single.json', {newLine: ',\r\n'} ))
    .pipe(gulp.dest('dist'));
  done();
});

gulp.task('clean', function (done) {
  del(['dist/**/*']);
  done();
});

function defaultTask(cb) {
    // place code for your default task here
    cb();
  }
  
  exports.default = defaultTask