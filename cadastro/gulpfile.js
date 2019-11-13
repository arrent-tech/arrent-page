var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename');

var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var SRC_DIR = './src';
var DIST_DIR = './dist';

gulp.task('sass', function(){
    return gulp.src([SRC_DIR + '/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_DIR))
});

gulp.task('sass--prod', function(){
    return gulp.src([SRC_DIR + '/**/*.scss'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('babel', function(){
    return gulp.src(SRC_DIR + '/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('babel--prod', function(){
    return gulp.src(SRC_DIR + '/**/*.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(DIST_DIR))
});

gulp.task('watch', function(){
    gulp.watch("src/**/*.scss", gulp.series('sass'));
    gulp.watch("src/**/*.js", gulp.series('babel'));
});


gulp.task('default', gulp.series('sass', 'babel', 'watch'));

gulp.task('build', gulp.series('sass--prod', 'babel--prod'));
