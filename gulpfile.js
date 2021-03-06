const gulp     	       = require("gulp");
const babel    	       = require("gulp-babel");
const cleanCSS 	       = require("gulp-clean-css");
const stripCssComments = require('gulp-strip-css-comments');
const sass 	   	       = require("gulp-sass");
const autoprefixer     = require("gulp-autoprefixer");
const uglify           = require("gulp-uglify");
const livereload       = require("gulp-livereload");
const filter           = require('gulp-filter');
const plumber          = require('gulp-plumber');
const flatten          = require('gulp-flatten');
const concat           = require('gulp-concat');
const order            = require('gulp-order');
const wait             = require('gulp-wait');
const mainBowerFiles   = require('main-bower-files');
const del              = require('del');
const strip            = require('gulp-strip-comments');
const nodemon          = require('gulp-nodemon');
const bower            = mainBowerFiles();

const src  = "src";
const dist = "public";

// bower
gulp.task('bower', [
  'bower:js',
  'bower:css',
  'bower:fonts',
]);

gulp.task('bower:js', () => {
  return gulp.src(bower)
    .pipe(filter(['**/*.js']))
    .pipe(concat('_bower.js'))
    .pipe(gulp.dest(`${src}/js`));
});

gulp.task('bower:css', () => {
  return gulp.src(bower)
    .pipe(filter(['**/*.css']))
    .pipe(concat('_bower.scss'))
    .pipe(stripCssComments())
    .pipe(gulp.dest(`${src}/scss`));
});

gulp.task('bower:fonts', () => {
  return gulp.src(bower)
    .pipe(filter(['**/*.{eot,svg,ttf,woff,woff2}']))
    .pipe(flatten())
    .pipe(gulp.dest(`${src}/fonts`));
});

// sass
gulp.task('sass', () => {
	return gulp.src(`${src}/scss/style.scss`)
    .pipe(sass(sass()).on('error', sass.logError))
    .pipe(stripCssComments())
    .pipe(cleanCSS({ compatibility: "ie8"}))
    .pipe(flatten())
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(gulp.dest(`${dist}/css`))
    .pipe(livereload());
});

// scripts & es6
gulp.task("scripts", () => {
  return gulp.src(`${src}/**/*.js`)
		.pipe(babel({
			presets: ["es2015"],
      compact: true,
      ignore: [
        '_bower.js',
      ]
		}))
    .pipe(flatten())
    .pipe(order([
      "_bower.js",
      "app.js",
      "**/*.js"
    ]))
    .pipe(concat('app.js'))
    .pipe(plumber())
    // .pipe(uglify())
    .pipe(gulp.dest(`${dist}/js`))
    .pipe(wait(1500))
    .pipe(livereload());
});

gulp.task('copy', [
  'copy:fonts',
  'copy:images',
  'copy:html'
]);

// copy html from src to dist
gulp.task("copy:html", () => {
  return gulp.src(`${src}/**/*.html`)
    .pipe(gulp.dest(dist));
});
// copy fonts from src to dist
gulp.task("copy:fonts", () => {
  return gulp.src(`${src}/**/*.{eot,svg,ttf,woff,woff2}`)
    .pipe(gulp.dest(dist));
});
// copy images  from src to dist
gulp.task("copy:images", () => {
  return gulp.src(`${src}/**/*.{png,gif,jpg,ico}`)
    .pipe(gulp.dest(dist));
});

// clean public
gulp.task('clean:public', () => {
  return del([
    'public/**/*',
  ]);
});

gulp.task('html', () => {
  return gulp.src('./index.html')
  .pipe(livereload());
});

// watch changes
gulp.task("watch", () => {
  livereload.listen();
  gulp.watch('./index.html', ['html']);
  gulp.watch(`${src}/**/*.js`, ['bower', 'scripts']);
  gulp.watch(`${src}/**/*.scss`, ['sass']);
  gulp.watch(`${src}/**/*.{png,gif,jpg,ico}`, ['copy:images']);
  gulp.watch(`${src}/**/*.{eot,svg,ttf,woff,woff2}`, ['copy:fonts']);
  gulp.watch(`${src}/**/*.html`, ['copy:html']);
});

gulp.task('nodemon', () => {
  return nodemon({
    script: 'index.js'
  }).on('readable', () => {
    this.stdout.on('data', chunk => {
      if (/^listening/.test(chunk)) {
        livereload.reload();
      }
      process.stdout.write(chunk);
    });
  });
});

gulp.task("default", [
  'clean:public',
  'bower',
  'sass',
  'copy',
  'scripts',
  'watch',
  'nodemon'
]);
