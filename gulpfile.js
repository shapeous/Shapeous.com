var gulp = require("gulp")
  , util = require("gulp-util")
  , conn = require("gulp-connect")
  , sass = require("gulp-compass")
  , del  = require("gulp-clean-dest")
  ;

// sources
var appRoot = "dev/"
  , srcRoot = "src/"
  , htmlSrc = appRoot + "*.html"
  , sassSrc = srcRoot + "sass/"
  ;

gulp.task("connect", function() {
  // I create a Web server which I will use to live reload the page as changes occur.
  conn.server(
    { "root": appRoot
    , "livereload": true
    })
});

gulp.task("html", function() {
  // I handle html files
  gulp.src(htmlSrc)
    .pipe(conn.reload());
});

gulp.task("compass", function() {
  // I transpile SASS files into CSS
  gulp.src(sassSrc + "style.scss")
    .pipe(sass(
      { "sass":	sassSrc
      , "style": "expanded"
      , "comments": true
      })
      .on("error", util.log)
    )
    .pipe(gulp.dest(appRoot + "css"))
    .pipe(conn.reload())
    .pipe(del("css"))	// Deleting "css/style.css" allows style to be changed from one run to the next
});

gulp.task("watch", function() {
  // I watch for file changes and run tasks
  gulp.watch(htmlSrc, ["html"]);
  gulp.watch(sassSrc + "*.scss", ["compass"]);
});

gulp.task("default", ["connect", "html", "compass", "watch"], function() {
  util.log("- I loaded all above tasks ;)");
});
