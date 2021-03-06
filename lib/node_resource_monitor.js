// Generated by CoffeeScript 1.6.2
var NodeResourceMonitor, os, _;

os = require('os');

_ = require('lodash');

NodeResourceMonitor = (function() {
  function NodeResourceMonitor(maxPoints) {
    this.maxPoints = maxPoints != null ? maxPoints : 500;
    this.data = {
      timestamp: [],
      totalMemory: [],
      freeMemory: [],
      cpuUser: [],
      cpuSys: [],
      cpuIdle: [],
      memRss: [],
      memHeapTotal: [],
      memHeapUsed: []
    };
    this.timer = void 0;
  }

  NodeResourceMonitor.prototype.getTimestamp = function() {
    return parseInt(new Date().getTime());
  };

  NodeResourceMonitor.prototype.getUptime = function() {
    return os.uptime();
  };

  NodeResourceMonitor.prototype.getHostname = function() {
    return os.hostname();
  };

  NodeResourceMonitor.prototype.getPlatform = function() {
    return os.platform();
  };

  NodeResourceMonitor.prototype.getArch = function() {
    return os.arch();
  };

  NodeResourceMonitor.prototype.getRelease = function() {
    return os.release();
  };

  NodeResourceMonitor.prototype.getTotalMemory = function() {
    return os.totalmem();
  };

  NodeResourceMonitor.prototype.getFreeMemory = function() {
    return os.freemem();
  };

  NodeResourceMonitor.prototype.getCpuUsage = function() {
    var fn_reduce, init_val, usage;

    init_val = {
      user: 0,
      sys: 0,
      idle: 0,
      total: 0
    };
    fn_reduce = function(mem, val) {
      var times;

      times = val.times;
      mem.user += times.user;
      mem.sys += times.sys;
      mem.idle += times.idle;
      return mem;
    };
    usage = _.reduce(os.cpus(), fn_reduce, init_val);
    usage.total = usage.user + usage.sys + usage.idle;
    return usage;
  };

  NodeResourceMonitor.prototype.getMemoryUsage = function() {
    return process.memoryUsage();
  };

  NodeResourceMonitor.prototype.makeDataPoints = function() {
    var cpuUsage, memUsage;

    cpuUsage = this.getCpuUsage();
    memUsage = this.getMemoryUsage();
    return {
      timestamp: this.getTimestamp(),
      totalMemory: this.getTotalMemory(),
      freeMemory: this.getFreeMemory(),
      cpuUser: parseInt(cpuUsage.user * 100 / cpuUsage.total, 10),
      cpuSys: parseInt(cpuUsage.sys * 100 / cpuUsage.total, 10),
      cpuIdle: parseInt(cpuUsage.idle * 100 / cpuUsage.total, 10),
      memRss: memUsage.rss,
      memHeapTotal: memUsage.heapTotal,
      memHeapUsed: memUsage.heapUsed
    };
  };

  NodeResourceMonitor.prototype.collectData = function() {
    var data;

    data = this.makeDataPoints();
    if (this.data.timestamp.length > this.maxPoints) {
      this.data.timestamp.shift();
      this.data.totalMemory.shift();
      this.data.freeMemory.shift();
      this.data.cpuUser.shift();
      this.data.cpuSys.shift();
      this.data.cpuIdle.shift();
      this.data.memRss.shift();
      this.data.memHeapTotal.shift();
      this.data.memHeapUsed.shift();
    }
    this.data.timestamp.push(data.timestamp);
    this.data.totalMemory.push(data.totalMemory);
    this.data.freeMemory.push(data.freeMemory);
    this.data.cpuUser.push(data.cpuUser);
    this.data.cpuSys.push(data.cpuSys);
    this.data.cpuIdle.push(data.cpuIdle);
    this.data.memRss.push(data.memRss);
    this.data.memHeapTotal.push(data.memHeapTotal);
    return this.data.memHeapUsed.push(data.memHeapUsed);
  };

  NodeResourceMonitor.prototype.start = function(interval) {
    var fnCollect,
      _this = this;

    if (interval == null) {
      interval = 5000;
    }
    if (this.timer != null) {
      return;
    }
    fnCollect = function() {
      return _this.collectData();
    };
    return setInterval(fnCollect, interval);
  };

  NodeResourceMonitor.prototype.stop = function() {
    clearInterval(this.timer);
    return this.timer = void 0;
  };

  NodeResourceMonitor.prototype.get = function() {
    return this.data;
  };

  return NodeResourceMonitor;

})();

module.exports = NodeResourceMonitor;
