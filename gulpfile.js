var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    livereload = require('gulp-livereload');

gulp.task('reload', function(){
    livereload.reload();
});

gulp.task('sync', function() {
    livereload.listen();
    gulp.watch('./src/*.html', ['reload']);
});
