var options = require('../couchdb-stats-monitor.json');

function serviceLoop () {
    setTimeout(serviceLoop, options.pollInterval);
}

setTimeout(serviceLoop, options.pollInterval);
