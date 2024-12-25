var fs = require('fs/promises');
var execFile = require('child_process').execFile;
var { dest, parallel, series, src, watch } = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var wait = require('gulp-wait');
var mocha = require('gulp-mocha');

var optionsFile = './couchdb-stats-monitor.json';
var scriptFiles = './**/*.js';
var testFiles = './test/**/*.js';

const copyConfig = exports['copy-config'] = async function () {
    const stat = await fs.stat(optionsFile);
    return src('./couchdb-stats-monitor.json.template')
        .pipe(gulpif(!stat || !stat.isFile(), rename(optionsFile)))
        .pipe(gulpif(!stat || !stat.isFile(), dest('./')));
}

function lint () {
    return gulp.src(scriptFiles).pipe(jshint());
}

function test () {
    return src(testFiles).pipe(mocha());
}

function startMetriks () {
    var metriks = require('./src/metriks-wrapper')();

    metriks.start();
}

function startServer () {
    return execFile('./server.js');
}

exports.watchFiles = series(copyConfig, startMetriks, function(cb) {
    watch(scriptFiles, series(function() {
        test();
    }));
});

const dflt = exports.default = parallel(series(copyConfig, startMetriks), startServer);
exports['test-env'] = series(lint, test, dflt);
