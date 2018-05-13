/*BASE*/
const gulp = require("gulp");
const watch = require("gulp-watch");

/* HTML */
const rigger = require("gulp-rigger");
const htmlmin = require("gulp-htmlmin");

/* CSS */
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");

/* Plugin for JS*/
const concat = require("gulp-concat");
const minify = require("gulp-minify");

/* Plugin for webserver*/
const browserSync = require("browser-sync");
const reload = browserSync.reload;

/*IMG*/
const imageminMozjpeg = require("imagemin-mozjpeg");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");

/*HELPERS*/
const newer = require("gulp-newer"); /*  Plugin look for new changes in files */

// Task for gulp-rigger
gulp.task("rightml", function() {
  gulp
    .src("./src/*.html")
    .pipe(rigger())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build/"))
    .pipe(reload({ stream: true }));
});

//Task for CSS
gulp.task("css", () => {
  gulp
    .src("./src/css/main.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({ outputStyle: "compressed" }).on("error", function(err) {
        return notify().write(err);
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./build/css"))
    .pipe(reload({ stream: true }));
});

// Task for FONTS
gulp.task("webfonts", function() {
  gulp
    .src("./src/webfonts/*{ttf,woff,woff2,svg,eot,otf}")
    .pipe(newer("./build/webfonts/"))
    .pipe(gulp.dest("./build/webfonts"));
  gulp
    .src("./src/css/*.css")
    .pipe(gulp.dest("./build/css"))
    .pipe(reload({ stream: true }));
});

// Task for Images
gulp.task("images", () => {
  gulp
    .src("./src/img/**/*.*")
    .pipe(newer("./build/img/"))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
        interlaced: true
      })
    )
    .pipe(gulp.dest("./build/img/"))
    .pipe(reload({ stream: true }));
});

// Task for JS
gulp.task("js", () => {
  gulp
    .src([
      "./node_modules/jquery/dist/jquery.js",
      "./node_modules/slick-carousel/slick/slick.js",
      "./src/js/main.js"
    ])
    .pipe(concat("main.js"))
    .pipe(
      minify({
        ext: {
          min: ".js"
        },
        compress: true,
        noSource: true
      })
    )
    .pipe(gulp.dest("./build/js"))
    .pipe(reload({ stream: true }));
});

// Task Build
gulp.task("build", ["rightml", "css", "js", "webfonts", "images"]);

/*Task for webserver*/
const config = {
  server: {
    baseDir: "./build"
  },
  tunnel: false,
  host: "localhost",
  port: 9000,
  logPrefix: "anastasiia-server"
};

gulp.task("webserver", () => browserSync(config));

/* Task Watch */
gulp.task("watch", () => {
  watch("./src/**/*.html", () => gulp.run("rightml"));
  watch("./src/css/**/*.scss", { readDelay: 100 }, () => gulp.run("css"));
  watch("./src/js/**/*.js", () => gulp.run("js"));
  watch("./src/webfonts/**/*.*", () => gulp.run("webfonts"));
  watch("./src/img/*{png,svg,jpg}", () => gulp.run("images"));
});

/* Default task */
gulp.task("default", ["build", "webserver", "watch"]);
