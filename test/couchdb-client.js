var assert = require('assert')
var cdbclient = require('../src/couchdb-client');

describe('couchdb-client', function () {
    describe('#connect', function () {
        it('should connect without error', function (done) {
            client = cdbclient();
            client.connect(function (response) {
                done();
            });
        });
    });
});