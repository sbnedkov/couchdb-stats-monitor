couchdb-stats-monitor
=====================

A graph generator for monitoring CouchDB backed by RRD tool and built as a [Metriks](https://github.com/kvz/metriks) plugin.

Instructions
------------

In order to install execute:

```shell
npm install
gulp copy-config
```

You can edit *./couchdb-stats-monitor.json* to set a custom port.

To start collecting data start CouchDB and run:
```shell
gulp
```

Then you can access the monitor at:

http://localhost:31313/
