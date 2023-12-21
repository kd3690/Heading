"use strict";

// All plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
var sass = require('gulp-sass')(require('sass'));
const gulp = require("gulp");
const cssnano = require("cssnano");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const livereload = require('gulp-livereload');
const notify = require('gulp-notify');
var reload = browsersync.reload;

// SCSS task
gulp.task("scss-compile", () => {
  return gulp
    .src("assets/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    // .pipe(rename({
    //   suffix: "."
    // }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("assets/css"))
    // .pipe(notify({
    //   message: "main SCSS processed"
    // }))
    .pipe(browsersync.stream())
    .pipe(livereload())
});

// Browser sync
gulp.task("browser-sync", function (done) {
  browsersync.init({
    server: "./",
    startPath: "index.html",
    host: 'localhost',
    open: true,
    tunnel: true
  });
  gulp.watch(["./**/*.html"]).on("change", reload);
  done();
});

gulp.task("default", gulp.series("scss-compile", "browser-sync", () => {
  livereload.listen();
  gulp.watch(["assets/scss/**/*"], gulp.series("scss-compile"));
}));