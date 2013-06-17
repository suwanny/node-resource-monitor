node-resource-monitor
=====================

Monitoring system resources that consumed by a nodejs app

## How to install

    npm install node-resource-monitor

## How to use

    var NodeResourceMonitor = require('./node_resource_monitor');
    var monitor = new NodeResourceMonitor();

    // start
    monitor.start(1000);

    // get data points
    var data = monitor.get();

    // stop
    monitor.stop();

    


## Prepare to develop (to contribute)

    npm install coffee-script -g
    npm install mocha -g
    

## How to test

    npm test


