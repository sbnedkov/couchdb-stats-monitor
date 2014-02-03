var assert = require('assert')
var cdbsm = require('../src/cdbsm');

describe('cdbsm', function () {
    describe('#connect', function () {
        it('should connect without error', function (done) {
            monitor = cdbsm();
            monitor.connect(function (response) {
                done();
            });
        });
    });
});