var express = require('express');
var cdbsm = require('./cdbsm');

var app = express();
var monitor = cdbsm();

app.get('/', function (req, res) {
    monitor.connect(function (stats) {
        res.send(stats);
    });
});

app.listen(31313);
