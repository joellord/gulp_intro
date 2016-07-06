"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var sass = require("gulp-sass");
var jshint = require("gulp-jshint");

var folders = {
  "html": "./*.html",
  "sass": "src/**/*.scss",
  "js": "src/**/*.js"
};

gulp.task("jshint", function() {
  gulp.src(folders.js)
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("watch", function(){
  gulp.watch([folders.sass], ["sass"]);
  gulp.watch([folders.js], ["jshint"]);
});

gulp.task("copy", function(next) {
  //Copy the files
  gulp.src(folders.html)
      .pipe(gulp.dest("./dist"));
  gulp.src(folders.js)
      .pipe(gulp.dest("./dist"));
  next();
});

gulp.task("sass", function(next) {
  //Transpile SASS to CSS and concatenate to styles.css
  gulp.src("src/sass/main.scss")
      .pipe(sass())
      .pipe(concat("styles.css"))
      .pipe(gulp.dest("./dist"));
  next();
});

gulp.task("build", ["copy", "sass"]);

gulp.task("default", ["build", "watch"]);