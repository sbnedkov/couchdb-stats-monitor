require('./logger')
var options = require('../couchdb-stats-monitor.json');
var Plugin = require('metriks/lib/plugin').Plugin;
var logger = require('winston')

module.exports = function () {
    var plugins = [];

    return {
        register: register,
        reload: reload,
        start: start
    };

    function register (ps, callback) {
        ps.forEach(function (plugin) {
            var name = plugin.name;
            var workdir = process.env['HOME'] + '/.cdbsm/';
            var pluginFile = __dirname + '/../plugin/' + name + '.js';
            var rrdFile = workdir + name + '.rrd';
            var pngFile = workdir + name + '.png';

            plugins.push(new Plugin({
                name: name,
                dataType: convertDataType(plugin.dataType),
                step: 5,
                samples: 17280,
                graphType: convertGraphType(plugin.graphType),
                graphSpan: 1800,
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
                },
                timeout: 1000
            }));
        });
        callback(null);
    }

    function reload (callback) {
        plugins.forEach(function (plugin) {
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
            plugins.forEach(function (plugin) {
                plugin.run(function (err, res) {
                    if (err) {
                        logger.log(err);
                    }
                });
            });
        }
    }

    function start (plugins) {
        register(options.graphs, function (err) {
            if (err) {
                    logger.log(err);
            } else {
                    reload(function () {
                            loop();
                    });
            }
        });
    }

    function convertDataType (dataType) {
        return 'COUNTER';
//        switch (dataType) {
//            case 'COUNTER':
//                return Plugin.constants.rra.counter;
//            case 'GAUGE':
//                return Plugin.constants.rra.gauge;
//            default:
//                return Plugin.constants.rra.counter;
//        }
    }

    function convertGraphType (graphType) {
        return 'AREA';
//        switch (graphType) {
//            case 'AREA':
//                return Plugin.constants.graph.area;
//            case 'LINE1':
//                return Plugin.constants.graph.line;
//            default:
//                return Plugin.constants.graph.area;
//        }
    }
};

