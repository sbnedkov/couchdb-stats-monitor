var assert = require('assert')
var metriks = require('../src/metriks-wrapper')();

describe('metriks-wrapper', function () {
    describe('#register', function () {
        it('should register plugins without error', function (done) {
            metriks.register([{name: 'request_time', dataType: 'COUNTER'}], function (err) {
                if (!err) {
                    done();
                } else {
                    assert(false, err);
                }
            });
        });
    });
});

