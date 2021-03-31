const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const gap = require('gulp-append-prepend');
const fs = require('fs');
const log = require('fancy-log');

gulp.task('create-file', function (done) {
  log('Creating dist/staging.json from all models in models directory');

  gulp
    .src('models/**.json')
    .pipe(concat('staging.json', { newLine: ',\r\n' }))
    .pipe(gulp.dest('dist'));
  done();
});

gulp.task('add-header', function (done) {
  log('Prepending header.json text and Models section dist/staging.json');

  gulp
    .src('dist/staging.json')
    .pipe(gap.prependText('{"Section": "Models"}', ',\r\n'))
    .pipe(gap.prependFile('header.json', ',\r\n'))
    .pipe(gap.prependText('[', '\r\n'))
    .pipe(gap.appendText(']'))
    .pipe(concat('staging.json'))
    .pipe(gulp.dest('dist'));
  done();
});

gulp.task('clean', function (done) {
  log('Deleting all files from dist directory');

  del(['dist/**/*']);
  done();
});

gulp.task('ndjson', function (done) {
  log('Converting dist/staging.json into ndjson formatted file');

  const arrObj = JSON.parse(fs.readFileSync('dist/staging.json'));
  const ndJson = arrObj.map(JSON.stringify).join('\n');
  
  fs.writeFile('dist/import.ndjson', ndJson, done);  
  
  done();
});


function defaultTask(cb) {
 
  
  cb();
}

exports.default = defaultTask;
