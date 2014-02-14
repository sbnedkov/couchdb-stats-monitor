#!/usr/bin/env node

require('../src/base-plugin').query('request millis', ['couchdb', 'open_os_files', 'current']);

