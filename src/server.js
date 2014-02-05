var express = require('express');
var cdbclient = require('./couchdb-client');

var app = express();
var client = cdbclient();

app.get('/', function (req, res) {
    client.connect(function (stats) {
        res.send(stats);
    });
});

app.listen(31313);
