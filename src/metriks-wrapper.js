var _ = require('underscore');
var options = require('../couchdb-stats-monitor.json');
var Plugin = require('metriks/lib/plugin').Plugin;
var logger = require('simple-log').init('cdbsm');

module.exports = function () {
    var plugins = [];

    return {
        register: register,
        reload: reload,
        start: start
    };

    function register (ps, callback) {
        _.each(ps, function (plugin) {
            var workdir = process.env['HOME'] + '/.cdbsm/';
            var pluginFile = __dirname + '/../plugin/' + plugin + '.js';
            var rrdFile = workdir + plugin + '.rrd';
            var pngFile = workdir + plugin + '.png';

            plugins.push(new Plugin({
                name: plugin,
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
            }));
        });
        callback();
    }

    function reload (callback) {
        _.each(plugins, function (plugin) {
            plugin.reload(function (err, res) {
                if (err) {
                    logger.log(err);
                }
            });
        });
        callback();
    }

    function loop () {
        run();
        setTimeout(loop, options.pollInterval);

        function run () {
            _.each(plugins, function (plugin) {
                plugin.run(function (err, res) {
                    if (err) {
                        logger.log(err);
                    }
                });
            });
        }
    }

    function start (plugins) {
        register(plugins, function () {
            reload(function () {
                loop();
            });
        });
    }
};
