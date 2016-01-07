/**
 * Created by bqxu on 15/12/18.
 */
var gulp = require('gulp');
var webpack = require('gulp-webpack');
//var named = require('vinyl-named');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpSequence = require('gulp-sequence').use(gulp);
var app = ['./src/main.js'];
gulp.task('webpack', function () {
  return gulp.src(app)
    .pipe(webpack({
      output: {
        filename: 'build.js'
      },
      module: {
        loaders: [
          {test: /\.vue$/, loader: 'vue'}
        ]
      }
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

var file = [
  './index.html',
  './favicon.ico'
];
gulp.task('file', function () {
  return gulp.src(file)
    .pipe(gulp.dest('out/'))
});

var assets = [
  './dist/**/*.js'
];
gulp.task('assets', function () {
  return gulp.src(assets)
    .pipe(gulp.dest('out/dist'))
});


gulp.task('default', gulpSequence("webpack", "file","assets"));
