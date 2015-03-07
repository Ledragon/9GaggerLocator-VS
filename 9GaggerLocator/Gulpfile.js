var gulp = require('gulp');

//use config file to reuse gulp file easily
var config = require('./gulp.config')();

//lazy laod plugins to avoid a huge list at the top of the file
var $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('vet', function () {
    log('Analyzing source with JSHint and JSCS');

    return gulp.src(config.alljs)
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});

gulp.task('wiredep', function () {
    var options = config.getWiredepOptions();
    var wiredep = require('wiredep').stream;
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js), config.injectOptions))
        .pipe(gulp.dest(config.client));
});

// functions
function log(message) {
    $.util.log($.util.colors.blue(message));
}