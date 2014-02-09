var rest = require('rest');
var logger = require('simple-log').init('cdbsm');

module.exports = {
    query: query
};


function query (stats) {
    rest('http://localhost:31313/stats/' + stats.join('/')).then(function (stat) {
        console.log(parseInt(JSON.parse(stat.entity).value));
    }, function (err) {
        logger.log(err);
        console.log(0);
    });
}
