var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var browserify = require('browserify');
var tsify = require('tsify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var rename = require('gulp-rename');
var partialify = require('partialify/custom');
var uglify = require('gulp-uglify');

gulp.task('clean', function () {
    return del('build/**/*')
});

gulp.task('sass', function () {
    return gulp.src('src/pager.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('build'));
});

gulp.task('ts', function () {
    return gulp.src('src/pager.ts', { read: false })
        .pipe(tap(function (file) {
            file.contents = browserify(file.path)
                .plugin(tsify)
                .transform(partialify.alsoAllow('tpl'))
                .bundle()
                .on('error', function (error) {
                    console.error(error.toString());
                });
        }))
        .pipe(buffer())
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('default', function () {
    runSequence(
        'clean',
        ['sass', 'ts']
    );
});
