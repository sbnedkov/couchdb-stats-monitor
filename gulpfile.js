var fs = require('fs');
var spawn = require('child_process').spawn;
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');

var optionsFile = './couchdb-stats-monitor.json';
var scriptFiles = './src/**/*.js';

gulp.task('copy-config', function() {
    fs.stat(optionsFile, function (err, stat) {
        gulp.src('./couchdb-stats-monitor.json.template')
            .pipe(gulpif(!stat || !stat.isFile(), rename(optionsFile)))
            .pipe(gulpif(!stat || !stat.isFile(), gulp.dest('./')));
    });    
});

gulp.task('test', function(){
    gulp.src(scriptFiles).pipe(jshint());

    spawn('mocha', ['test'], {stdio: 'inherit'});
});

gulp.task('default', function(){
    gulp.run('copy-config', 'test');
    gulp.watch(scriptFiles, function(){
        gulp.run('test');
    });
});