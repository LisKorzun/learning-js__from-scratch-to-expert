var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('hello', function() {
    console.log('Hello Zell');
});

gulp.task('sass', function(){
    return gulp.src('scss/styles.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('build/css'))
});

gulp.task('js', function() {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('build/js'))
});



//npm install gulp -g
//npm init
//npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev

//gulp hello
//gulp sass
//gulp js