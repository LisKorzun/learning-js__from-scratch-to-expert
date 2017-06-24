'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rjs = require('requirejs');
const uglify = require('gulp-uglify');
const pump = require('pump');


/* BASE COMPLEX COMMANDS
 ========================================================================== */
/**
 * Execute building of js and css files for Prod
 * Command - gulp prod:build
 */
gulp.task('prod:build', ['prod:css', 'prod:fonts', 'prod:img', 'prod:js', 'prod:rjs', 'prod:index']);

/**
 * Execute building of js and css files for Dev
 * Command - gulp dev:build
 */
gulp.task('dev:build', ['dev:css', 'dev:fonts', 'dev:js', 'dev:rjs']);

/**
 * Watches for both js and scss files for Dev
 * Command - gulp dev:watch:style
 */
gulp.task('dev:watch', ['dev:watch:js', 'dev:watch:css']);


/* PARTIAL COMMANDS
 ========================================================================== */
/**
 * Executes build of styles for Prod
 * Command - gulp prod:style
 */
gulp.task('prod:css', function () {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

/**
 * Executes build of fonts for Prod
 * Command - gulp prod:fonts
 */
gulp.task('prod:fonts', function () {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./public/fonts'));
});

/**
 * Executes build of styles for Dev
 * Command - gulp dev:css
 */
gulp.task('dev:css', function () {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});

/**
 * Executes build of fonts for Dev
 * Command - gulp dev:fonts
 */
gulp.task('dev:fonts', function () {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./app/fonts'));
});

/**
 * Executes copying of index.html for Prod
 * Command - gulp prod:index
 */
gulp.task('prod:index', function () {
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./public'));
});

/**
 * Executes copying of images for Prod
 * Command - gulp prod:img
 */
gulp.task('prod:img', function () {
    return gulp.src('./app/img/*')
        .pipe(gulp.dest('./public/img'));
});

/**
 * Executes build of js for Prod
 * Command - gulp prod:js
 */
gulp.task('prod:js', function (cb) {
    rjs.optimize({
        baseUrl: "./app/js/app",
        name: "../init",
        out: "./public/js/build.js",
        paths: {
            underscore: '../lib/underscore',
            text: '../lib/text',
            firebase: 'https://www.gstatic.com/firebasejs/4.1.2/firebase'
        },
        shim: {
            firebase: {
                exports: 'firebase'
            }
        }
    }, function (buildResponse) {
        console.log('build response', buildResponse);
        cb();
    }, cb);
});

/**
 * Executes minifying of RequireJS for Prod
 * Command - gulp prod:rjs
 */
gulp.task('prod:rjs', function (cb) {
    pump([
            gulp.src('./node_modules/requirejs/require.js'),
            uglify(),
            gulp.dest('./public/js/lib')
        ],
        cb
    );
});

/**
 * Executes build of js for Dev
 * Command - gulp dev:js
 */
gulp.task('dev:js', function (cb) {
    rjs.optimize({
        baseUrl: "./app/js/app",
        name: "../init",
        out: "./app/js/build.js",
        optimize: 'none',
        paths: {
            underscore: '../lib/underscore',
            text: '../lib/text',
            firebase: 'https://www.gstatic.com/firebasejs/4.1.1/firebase'
        },
        shim: {
            firebase: {
                exports: 'firebase'
            }
        }
    }, function (buildResponse) {
        console.log('build response', buildResponse);
        cb();
    }, cb);
});

/**
 * Executes copying of RequireJS for Dev
 * Command - gulp dev:rjs
 */
gulp.task('dev:rjs', function () {
    return gulp.src('./node_modules/requirejs/require.js')
        .pipe(gulp.dest('./app/js/lib'));
});

/**
 * Watches for js files for Dev
 * Command - gulp dev:watch:js
 */
gulp.task('dev:watch:js', function () {
    gulp.watch('app/js/app/**/*.js', ['dev:js']);
    gulp.watch('app/js/app/**/*.html', ['dev:js']);
});

/**
 * Watches for scss files for Dev
 * Command - gulp dev:watch:style
 */
gulp.task('dev:watch:css', function () {
    gulp.watch('app/scss/**/*.scss', ['dev:css']);
});
