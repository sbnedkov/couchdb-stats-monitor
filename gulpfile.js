var fs = require('fs');
var spawn = require('child_process').spawn;
var service = require('./src/service')();

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var wait = require('gulp-wait');

var optionsFile = './couchdb-stats-monitor.json';
var scriptFiles = './**/*.js';

gulp.task('copy-config', function() {
    fs.stat(optionsFile, function (err, stat) {
        gulp.src('./couchdb-stats-monitor.json.template')
            .pipe(gulpif(!stat || !stat.isFile(), rename(optionsFile)))
            .pipe(gulpif(!stat || !stat.isFile(), gulp.dest('./')));
    });    
});

gulp.task('test', function() {
    gulp.src(scriptFiles).pipe(jshint());

    spawn('mocha', ['test'], {stdio: 'inherit'});
});

gulp.task('start-daemon', function () {
    service.start(function (err) {
        if (err) {
            console.log(err);
        }
    });
    wait();
});

gulp.task('stop-daemon', function () {
    service.stop(function (err) {
        if (err) {
            console.log(err);
        }
    });
});

gulp.task('default', function() {
    gulp.run('copy-config', 'test');
    gulp.watch(scriptFiles, function() {
        gulp.run('test');
    });
});

gulp.task('test-env', function() {
    gulp.run('default', 'start-daemon');    
});

gulp.task('init', function () {
    gulp.src('./db/cdbsm.rrd')
        .pipe(gulp.dest(process.env['HOME'] + '/.cdbsm/'));
});