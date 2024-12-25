const winston = require('winston');
require('winston-modern-syslog');

winston.setLevels(winston.config.syslog.levels);
winston.add(winston.transports.ModernSyslog, { label: 'cdbsm', level: winston.LOG });
