rrdtool create db/cdbsm.rrd DS:request_time:COUNTER:5:U:U RRA:AVERAGE:0.5:1:1728 --step=5
