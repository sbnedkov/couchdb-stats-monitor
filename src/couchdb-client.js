var rest = require('rest');
var options = require('../couchdb-stats-monitor.json');
var logger = require('simple-log').init('cdbsm');

module.exports = function () {
    return {
        stats: stats
    };

    function stats (callback) {
        rest(['http://', options.host, ':', options.port, '/_stats'].join('')).then(function (response) {
            callback(JSON.parse(response.entity));
        }, function (err) {
            logger.log(err);
        });
    }
}
