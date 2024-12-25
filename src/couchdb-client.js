var rest = require('rest');
var logger = require('winston')
var options = require('../couchdb-stats-monitor.json');

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
