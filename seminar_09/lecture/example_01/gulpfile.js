var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('server')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});