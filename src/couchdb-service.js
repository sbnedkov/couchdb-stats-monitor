var options = require('../couchdb-stats-monitor.json');
var client = require('./couchdb-client')();

module.exports = function () {
    return {
        start: start
    }

    function start (callback) {
        loop(callback);
    }

    function loop (callback) {
        client.stats(function (currentStats) {
            callback(currentStats);
        });

        setTimeout(function () {
            loop(callback);
        }, options.pollInterval);
    }
};
