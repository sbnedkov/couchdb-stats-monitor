var options = require('../couchdb-stats-monitor.json');
var client = require('./couchdb-client')();
var rrdclient = require('./rrd-client')();
var logger = require('simple-log').init('cdbsm');


var pollInterval = 5000;

function serviceLoop () {
    client.connect(function (stats) {
        rrdclient.addSample(stats, function (err, res) {
            if (err) {
                logger.log('Error while adding sample to RRDtool: "' + JSON.stringify(err) + '"');
            }
        });
    });
    setTimeout(serviceLoop, pollInterval);
}

setTimeout(serviceLoop, pollInterval);
