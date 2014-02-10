var rest = require('rest');
var options = require('../couchdb-stats-monitor.json');
var logger = require('simple-log').init('cdbsm');

module.exports = {
    query: query
};


function query (name, stats) {
    rest('http://localhost:31313/stats/' + stats.join('/')).then(function (stat) {
        console.log('# graph.title: ' + name);
        console.log('# config.interval: ' + options.pollInterval / 1000);
        console.log(parseInt(JSON.parse(stat.entity).value));
    }, function (err) {
        logger.log(err);
        console.log(0);
    });
}
