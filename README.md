couchdb-stats-monitor
---------------------

A graph generator for monitoring CouchDB backed by RRD tool and built as a [Metriks](https://github.com/kvz/metriks) plugin.

For now in order to run start an instance of CouchDB and execute:

```shell
npm install
gulp
```

You can edit

```
couchdb-stats-monitor.json
```

to set a custom port.

Then you can access the monitor at:

```
http://localhost:31313/
```
