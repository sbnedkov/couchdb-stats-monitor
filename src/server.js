var express = require('express');
var client = require('./couchdb-client')();

var app = express();

app.get('/', function (req, res) {
    client.connect(function (stats) {
        res.send(stats);
    });
});

app.listen(31313);
