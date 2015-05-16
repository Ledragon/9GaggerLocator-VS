var gulp = require('gulp');

//use config file to reuse gulp file easily
var config = require('./gulp.config')();

//lazy laod plugins to avoid a huge list at the top of the file
var $ = require('gulp-load-plugins')({
    lazy: true
});

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
        .pipe(gulp.dest(config.client));
});

gulp.task('ts', function() {
    return gulp
        .src('./server/utilities/*.ts')
        .pipe($.typescript({
            noImplicitAny: false,
            declarationFiles: true,

        }))
        .js
        .pipe(gulp.dest('./server/utilities'));
});
gulp.task('tsc', function () {
    return gulp
        .src('./server/utilities/*.ts')
        .pipe($.tsc())
        .pipe(gulp.dest('./server/utilities'));
});

// functions
function log(message) {
    $.util.log($.util.colors.blue(message));
}