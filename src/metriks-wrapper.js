var options = require('../couchdb-stats-monitor.json');
var Plugin = require('metriks/lib/plugin').Plugin;
var logger = require('simple-log').init('cdbsm');

module.exports = function () {
    var plugin;

    return {
        register: register,
        reload: reload,
        start: start
    };

    function register (callback) {
        var workdir = process.env['HOME'] + '/.cdbsm/';
        var pluginFile = __dirname + '/../plugin/request_time.js';
        var rrdFile = workdir + 'cdbsm.rrd';
        var pngFile = workdir + 'cdbsm.png';

        plugin = new Plugin({
            name: 'cdbsm',
            pluginFile: pluginFile,
            rrdFile: rrdFile,
            pngFile: pngFile,
            autoWritePng: true,
            cli: {
                debug: function (str) {
                    console.log(str);
                },
                error: function (str) {
                    console.log(str);
                    logger.log(str);
                },
                info : function (str) {
                    console.log(str);
                },
            }
        });

        callback();
    }

    function reload (callback) {
        plugin.reload(function (err, res) {
            if (err) {
                logger.log(err);
            }
            callback();
        });
    }

    function start () {
        loop();
    }

    function loop () {
        run();
        setTimeout(loop, options.pollInterval);

        function run () {
            plugin.run(function (err, res) {
                if (err) {
                    logger.log(err);
                }
            });
        }
    }
};
