var gulp = require("gulp")
  , util = require("gulp-util")
  , conn = require("gulp-connect")
  ;

// sources
var appRoot = "dev/"
  , htmlSrc = appRoot + "*.html"
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

gulp.task("watch", function() {
  // I watch for file changes and run tasks
  gulp.watch(htmlSrc, ["html"]);
});

gulp.task("default", ["connect", "html", "watch"], function() {
  util.log("- I loaded all above tasks ;)");
});
