"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var run = require("run-sequence");
var del = require("del");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("posthtml", function () {
  gulp.src("*.html")
    .pipe(posthtml())
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2,otf}",
    "img/*.{svg,png,jpg,gif}",
    "js/*.js",
    "*.html"
  ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("build", function (done) {
  run("clean", "copy", "style", done);
});

gulp.task("serve", function () {
  server.init({
    server: "build/",
  });
  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("*.html", ["posthtml"]);
});
