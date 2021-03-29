const gulp = require("gulp");
const del = require("del");
const concat = require("gulp-concat");
const fs = require("fs");

gulp.task("js", function (done) {
  gulp
    .src("models/**.json")
    .pipe(concat("single.json", { newLine: ",\r\n" }))
    .pipe(gulp.dest("dist"));

   
  done();
});

gulp.task("clean", function (done) {
  del(["dist/**/*"]);
  done();
});

gulp.task("ndjson", function (done) {
  const arrObj = JSON.parse(fs.readFileSync('dist/test.json'));
  const ndJson = arrObj.map(JSON.stringify).join('\n');
  console.log(ndJson);
  done();

});

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask;
