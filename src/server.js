var express = require('express');
var client = require('./couchdb-client')();
var service = require('./service')();

var app = express();

var lastStats;

app.get('/stats/:group/:stat/:measure', function (req, res) {
    res.send({
        value: (lastStats ? lastStats[req.params.group][req.params.stat][req.params.measure] : 0)
    });
});

service.start(function (stats) {
    lastStats = stats;
});

app.listen(31313);
