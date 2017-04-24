//requiring NPM modeles
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var prefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var cssmin = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var serveStatic = require('serve-static');
var parseurl = require('parseurl');

//requiring local modeles
var configs = require('./config');
require('./index');

//paths
var path = {
  build: {
    html: 'client/',
    js: 'client/js/',
    css: 'client/css/',
    fonts: 'client/fonts',
    img: 'client/img/',
    template: 'client/template',
    video: 'client/videos'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/main.js',
    style: 'src/scss/main.scss',
    fonts: 'src/libs/bootstrap/fonts/**/*.*',
    img: 'src/img/**/*.*',
    template: 'src/template/**/*.*',
    video: 'videos/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/**/*.js',
    style: 'src/scss/**/*.scss',
    img: 'src/img/**/*.*',
    template: 'src/template/**/*.*'
  },
  clean: './client'
};

var config = {
  server: {
      baseDir: './client'
  },
  host: 'localhost',
  port: 8080,
  livereload: true,
  logPrefix: 'Crossover_Videoportal'
};

var exec = require('child_process').exec;

gulp.task('backend:run', function(cb) {
  exec('node index.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

//build client
gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});
gulp.task('template:build', function () {
  gulp.src(path.src.template)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.template))
    .pipe(reload({stream: true}));
});
gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.mapSources(function(sourcePath, file) {
        // source paths are prefixed with '../src/' 
        return '/src/' + sourcePath;
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});
gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer({
      browsers: ['last 16 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});
gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload({stream: true}));
});
gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});
gulp.task('video:build', function () {
  gulp.src(path.src.video)
    .pipe(gulp.dest(path.build.video))
    .pipe(reload({stream: true}));
});

gulp.task('build', [
  'html:build',
  'template:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build',
  'video:build'
]);

gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
      gulp.start('html:build');
  });
  watch([path.watch.template], function(event, cb) {
      gulp.start('template:build');
  });
  watch([path.watch.style], function(event, cb) {
      gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
      gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
      gulp.start('image:build');
  });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);
