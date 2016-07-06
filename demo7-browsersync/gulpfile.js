"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var sass = require("gulp-sass");
var jshint = require("gulp-jshint");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
var streamify = require("gulp-streamify");
var browserSync = require("browser-sync");

var folders = {
  "html": "./*.html",
  "sass": "src/**/*.scss",
  "js": "src/**/*.js"
};

//BS configuration - http://www.browsersync.io/docs/options/
var bsConfig = {
  ui: {
    port: 35555,
    weinre: {
      port: 35556
    }
  },
  ghostMode: {
    clicks: true,
    forms: true,
    scroll: true
  },
  proxy: "http://localhost:3000",
  logLevel: "warn",
  open: true,
  browser: ["google chrome"]
};

//Create the task
gulp.task("browser-sync", function() {
  //Start the browserSync with the provided configuration
  return browserSync(bsConfig, function (err) {
    if (!err) {
      console.info("BrowserSync is ready, UI on port 3000");
    } else {
      console.error(err);
    }
  });
});

//Add a task to reload connected browsers/devices
gulp.task("bs-reload", function () {
  return browserSync.reload();
});

//We also need to run a local server for this (BS is a proxy)
gulp.task("server", function () {
  //Look for a server module and start it
  require("./server");
});

gulp.task("jshint", function() {
  gulp.src(folders.js)
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("watch", function(){
  //Let's reload the browser when we sync
  gulp.watch([folders.sass], ["sass", "bs-reload"]);
  gulp.watch([folders.js], ["jshint", "modules", "bs-reload"]);
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
      .transform("babelify", {presets: ["es2015"]})
      .bundle()
      .pipe(source("main.js"))
      .pipe(streamify(uglify().on("error", (e) => console.log(e))))
      .pipe(gulp.dest("./dist"));
});

gulp.task("build", ["copy", "sass", "modules"]);

//Start the server on default, then browsersync
gulp.task("default", ["server", "browser-sync", "build", "watch"]);