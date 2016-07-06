var gulp = require("gulp");
var jshint = require("gulp-jshint");

gulp.task("default", function() {
  gulp.watch("./index.js", ["lint"]);
});

gulp.task("lint", function() {
  gulp.src(["index.js"])
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"));
});
