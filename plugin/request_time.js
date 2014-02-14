#!/usr/bin/env node

require('../src/base-plugin').query('request millis', ['couchdb', 'request_time', 'current']);

