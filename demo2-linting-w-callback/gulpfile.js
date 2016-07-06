var gulp = require("gulp");
var jshint = require("gulp-jshint");

gulp.task("default", function() {
  gulp.watch("./index.js", ["lint"]);
});

gulp.task("lint", function(cb) {
  gulp.src(["index.js"])
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"));
  //Adding a timeout.  The task will be "done" after this 5 seconds delay
  setTimeout(cb, 5000);
});
