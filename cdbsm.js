#!/usr/bin/env node

var client = require('./src/couchdb-client')();

client.connect(function (response) {
    console.log(parseInt(response['couchdb']['request_time']['current']));
});
