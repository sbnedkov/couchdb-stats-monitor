#!/usr/bin/env node

var rest = require('rest');
var logger = require('simple-log').init('cdbsm');

rest('http://localhost:31313/stats/couchdb/request_time/current').then(function (stat) {
    console.log(parseInt(JSON.parse(stat.entity).value));
}, function (err) {
    logger.log(err);
});
