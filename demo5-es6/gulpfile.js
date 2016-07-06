"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var sass = require("gulp-sass");
var jshint = require("gulp-jshint");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");

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
  gulp.watch([folders.js], ["jshint", "modules"]);
});

gulp.task("copy", function(next) {
  gulp.src(folders.html)
      .pipe(gulp.dest("./dist"));
  next();
});

gulp.task("sass", function(next) {
  gulp.src("src/sass/main.scss")
      .pipe(sass())
      .pipe(concat("styles.css"))
      .pipe(gulp.dest("./dist"));
  next();
});

gulp.task("modules", function() {
    browserify({
      entries: "./src/main.js"
    })
        //We simply need to add a transformation to our pipe
      .transform("babelify", {presets: ["es2015"]})
      .bundle()
      .pipe(source("main.js"))
      .pipe(gulp.dest("./dist"));
});

gulp.task("build", ["copy", "sass", "modules"]);

gulp.task("default", ["build", "watch"]);