//Initialize modules

const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const terser = require("gulp-terser");

//Use dart-class for @use
// sass.compiler = require("dart-sass");

//Sass Task
function scssTask() {
  return src("app/scss/styles.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(
      postcss([autoprefixer(), cssnano()]).pipe(
        dest("dist", { sourcemaps: "." })
      )
    );
}

//Javascript Task
function jsTask() {
  return src("app/js/script.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}

//BrowserSync
function browserSyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browserSyncReload);
  watch(
    ["app/scss/**/*.scss", "app/**/*.js"],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServer, watchTask);
