var assert = require('assert')
var cdbclient = require('../src/couchdb-client');

describe('couchdb-client', function () {
    describe('#connect', function () {
        it('should get stats without error', function (done) {
            client = cdbclient();
            client.stats(function (response) {
                done();
            });
        });
    });
});
