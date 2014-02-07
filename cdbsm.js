#!/usr/bin/env node

var client = require('./src/couchdb-client')();

client.stats(function (response) {
    console.log(parseInt(response['couchdb']['request_time']['current']));
});
