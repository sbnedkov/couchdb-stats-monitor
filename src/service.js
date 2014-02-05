var options = require('../couchdb-stats-monitor.json');
var spawn = require('child_process').spawn;
var cdbclient = require('./couchdb-client');

module.exports = function () {
    var service;
    
    return {
        start: start,
        stop: stop
    };

    function start (callback) {
        if (service) {
            callback && callback('Service already started');
        } else {
            service = spawn(options.nodeBinary, [__dirname + '/cdbsm-daemon.js']);
            callback && callback(null);
        }
    }

    function stop (callback) {
        if (!service) {
            callback && callback('No service running');
        } else {
            service.kill();
            service = null;
            callback && callback(null);
        }
    }
};
