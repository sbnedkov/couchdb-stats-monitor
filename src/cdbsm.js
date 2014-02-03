var rest = require('rest');
var options = require('../couchdb-stats-monitor.json');

module.exports = function () {
    return {
        connect: connect
    };

    function connect (callback) {
        rest(['http://', options.host, ':', options.port, '/_stats'].join('')).then(function (response) {
            callback(response);
        });
    }
}
