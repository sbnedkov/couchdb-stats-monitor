require('./logger')
var logger = require('winston')
var rest = require('rest');
var options = require('../couchdb-stats-monitor.json');

module.exports = {
    query: query
};


function query (name, stats) {
    rest('http://localhost:31313/stats/' + stats.join('/')).then(function (stat) {
        console.log(parseInt(JSON.parse(stat.entity).value));
    }, function (err) {
        logger.log(err);
        console.log(0);
    });
}
