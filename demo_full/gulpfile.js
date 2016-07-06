"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var babelify = require("babelify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var jshint = require("gulp-jshint");
var uglify = require("gulp-uglify");
var streamify = require("gulp-streamify");

var folders = {
  "html": "./*.html",
  "sass": "src/**/*.scss",
  "js": "src/**/*.js"
};
var jsHintPaths = [
  "src"
];

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

gulp.task("bs-reload", function () {
  return browserSync.reload();
});

gulp.task("watch", function(){
  gulp.watch([folders.js, folders.html, folders.sass], ["modules", "html", "sass", "bs-reload"]);
});

gulp.task("build", ["modules", "html", "sass", "bs-reload"]);

gulp.task("clean", function() {
  return gulp.src("dist")
      .pipe(clean());
});

gulp.task("modules", function() {
    browserify({
      entries: "./src/main.js",
    })
      .transform("babelify", {presets: ["es2015"]})
      .bundle()
      .pipe(source("main.js"))
      .pipe(streamify(uglify().on("error", (e) => console.log(e))))
      .pipe(gulp.dest("./dist"));
});

gulp.task("sass", function() {
  //Transpile SASS to CSS and concatenate to styles.css
  gulp.src("src/sass/main.scss")
      .pipe(sass())
      .pipe(concat("styles.css"))
      .pipe(gulp.dest("./dist"));
});

gulp.task("html", function() {
  //Copy the files
  return gulp.src(folders.html)
      .pipe(gulp.dest("./dist"));
});

var srcPaths = ["*.js"];
for (var i=0; i < jsHintPaths.length; i++) {
  srcPaths.push(jsHintPaths[i] + "/**/*.js");
}

gulp.task("jshint:hinting", function() {
  gulp.src(srcPaths)
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("jshint", function() {
  gulp.watch([srcPaths], ["jshint:hinting"]);
});


gulp.task("server", function () {
  //Look for a server module and start it
  require("./server");
});

gulp.task("default", ["build", "browser-sync", "watch", "jshint", "server"]);