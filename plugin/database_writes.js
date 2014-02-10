#!/usr/bin/env node

require('../src/base-plugin').query('database writes', ['couchdb', 'database_writes', 'current']);
