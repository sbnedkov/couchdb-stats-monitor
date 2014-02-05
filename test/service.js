var assert = require('assert')
var exec = require('child_process').exec;
var service = require('../src/service')();

describe('service', function () {    
    var psCommand = 'ps x | grep [c]dbsm-daemon.js | wc -l';

    describe('#start', function () {
        it('should start the service and be present in the process list', function (done) {
            service.start(function (err) {
                assert.equal(null, err);
                exec(psCommand, function (err, stdout, stderr) {
                    assert.notEqual(stdout, '0\n');
                    service.stop(function () {
                        done();
                    });                    
                });
            });
        });
    });

    describe('#stop', function () {
        it('should stop the service and be abscent from the process list', function (done) {
            service.start(function (err) {
                exec(psCommand, function (err, stdout, stderr) {
                    var oldStdout = stdout;
                    service.stop(function (err) {
                        assert.equal(null, err);
                        exec(psCommand, function (err, stdout, stderr) {
                            assert.notEqual(stdout, oldStdout);
                            done();
                        });
                    });
                });
            });
        });
    });    
});
