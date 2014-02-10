#!/usr/bin/env node

require('../src/base-plugin').query('request time in millisecond', ['couchdb', 'request_time', 'current']);
