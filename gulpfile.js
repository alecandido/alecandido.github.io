var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var fancy_log = require("fancy-log");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var rename = require("gulp-rename");
var glob = require("glob");
var es = require("event-stream");

// copy html

var html_paths = {
  pages: ["*.html"]
};

gulp.task("copy-html", function () {
  return gulp.src(html_paths.pages).pipe(gulp.dest("dist"));
});

// default

const ts_entries_pattern = "_ts/main-*.ts";
const ts_entries = glob.sync(ts_entries_pattern);

function task_factory(ts_entry) {
  var watchedBrowserify = watchify(
    browserify({
      basedir: ".",
      debug: true,
      entries: ts_entry,
      cache: {},
      packageCache: {}
    }).plugin(tsify)
  );

  function bundle() {
    return (
      watchedBrowserify
        .transform("babelify", {
          presets: ["es2015"],
          extensions: [".ts"]
        })
        .bundle()
        .on("error", fancy_log)
        //.pipe(source("bundle.js"))
        .pipe(source(ts_entry))
        // rename them to have "bundle as postfix"
        .pipe(
          rename({
            extname: ".bundle.js"
          })
        )
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("assets/js"))
    );
  }

  //watchedBrowserify.on("update", bundle);
  //watchedBrowserify.on("log", fancy_log);

  return bundle;
}

var tasks = ts_entries.map(task_factory);
function f(tasks) {
  return es.merge.apply(null, tasks);
}

//gulp.task("default", gulp.series(gulp.parallel("copy-html"), bundle));
gulp.task("default", gulp.series(gulp.parallel("copy-html"), f(tasks)));
