var RRDTool = require('metriks/lib/rrdtool').RRDTool;
var logger = require('simple-log').init('cdbsm');

module.exports = function () {
    var rrdFile = process.env['HOME'] + '/.cdbsm/cdbsm.rrd';
    var rrdtool = new RRDTool();

    return {
        addSample: addSample
    };

    function addSample (sample, callback) {
        try {
            rrdtool.update(rrdFile, new Date(), [parseInt(sample['couchdb']['request_time']['current'])], [], function (err, output) {
                callback(err, output);
            });
        } catch (e) {
            logger.log(e);
        }
    }
};
