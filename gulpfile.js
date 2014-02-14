var fs = require('fs');
var metriks = require('./src/metriks-wrapper')();

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var wait = require('gulp-wait');
var spawn = require('gulp-spawn');
var mocha = require('gulp-mocha');

var optionsFile = './couchdb-stats-monitor.json';
var scriptFiles = './**/*.js';
var testFiles = './test/**/*.js';

gulp.task('copy-config', function() {
    fs.stat(optionsFile, function (err, stat) {
        gulp.src('./couchdb-stats-monitor.json.template')
            .pipe(gulpif(!stat || !stat.isFile(), rename(optionsFile)))
            .pipe(gulpif(!stat || !stat.isFile(), gulp.dest('./')));
    });    
});

gulp.task('lint', function () {
    return gulp.src(scriptFiles).pipe(jshint());
});

gulp.task('test', function() {
    return gulp.src(testFiles).pipe(mocha());
});

gulp.task('start-metriks', function () {
    metriks.start();
});

gulp.task('start-server', function() {
    return gulp.src('server.js')
        .pipe(spawn({cmd: 'node', args: []}))
        .pipe(wait());
});

gulp.task('watch-files', ['copy-config', 'start-metriks'], function() {
    gulp.watch(scriptFiles, function() {
        gulp.run('test');
    });
});

gulp.task('default', ['copy-config', 'start-metriks', 'start-server'], function() {
});

gulp.task('test-env', ['lint', 'test', 'default'], function() {
});
