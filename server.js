#!/bin/env node

require('./src/logger')
var logger = require('winston')
var express = require('express');
var fs = require('fs');
var client = require('./src/couchdb-client')();
var service = require('./src/couchdb-service')();
var options = require('./couchdb-stats-monitor.json');

const PORT = 31313;

var app = express();

app.use(express.static(__dirname + '/html'));

var lastStats;

service.start(function (stats) {
    lastStats = stats;
});

app.get('/stats/:group/:stat/:measure', function (req, res) {
    res.send({
        value: (lastStats ? lastStats[req.params.group][req.params.stat][req.params.measure] : 0)
    });
});

app.get('/graphs', function (req, res) {
    res.send(options.graphs);
});

app.get('/graphs/:name', function (req, res) {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Expires', new Date(0));
    res.setHeader('Content-Type', 'image/png');
    fs.createReadStream(process.env['HOME'] + '/.cdbsm/' + req.params.name + '.png')
        .pipe(res);
});

app.listen(PORT, () => logger.log(`Server listening on ${PORT}.`));
