/// <vs SolutionOpened='watch-framework' />
var gulp = require('gulp');

//use config file to reuse gulp file easily
var config = require('./gulp.config')();

//lazy laod plugins to avoid a huge list at the top of the file
var $ = require('gulp-load-plugins')({
    lazy: true
});

var browserSync = require('browser-sync');

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp.src(config.alljs)
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});

gulp.task('wiredep', function() {
    var options = config.getWiredepOptions();
    var wiredep = require('wiredep').stream;
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js), config.injectOptions))
        .pipe($.inject(gulp.src(config.css), config.injectOptions))
        .pipe(gulp.dest(config.client));
});

gulp.task('tsc', function () {
    return gulp
        .src('./server/utilities/*.ts')
        .pipe($.typescript({
            target: 'ES5',
            modules:'commonjs'
        }))
        .pipe(gulp.dest('./server/utilities'));
});

gulp.task('tsc-client', function() {
    return gulp
        .src([
            './public/**/*.ts'
            ,'!./public/**/*.d.ts'
            , './public/scripts/**/*.d.ts'
        ])
        .pipe($.tsc({
            target: 'ES5',
            declaration: false,
            sourceMap: false
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('less', function() {
    return gulp.src('public/content/app.less')
        .pipe($.less({
            paths:['public/content/bower/**/*']
        }))
        .pipe(gulp.dest('public/content'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        proxy: {
            target: 'http://localhost:3030'
        },
        index: 'index.html',
        port: 4000,
        files: ['./public/**/*.*']
    });
});

// functions
function log(message) {
    $.util.log($.util.colors.blue(message));
}