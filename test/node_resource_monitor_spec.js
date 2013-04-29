var should = require('should');
var NodeResourceMonitor = require('../lib/node_resource_monitor');

describe('NodeResourceMonitor', function(){
  var res_mon = new NodeResourceMonitor();
  
  describe('#getTimestamp()', function(){
    it('should return a timestamp integer', function(){
      var ts = res_mon.getTimestamp();
      ts.should.be.a('number');
    });
    
    it('should bigger than 1367215459', function(){
      var ts = res_mon.getTimestamp();
      ts.should.be.above(1367215459);
    });
  });
  
  describe('#getUptime()', function(){
    it('should return a value', function(){
      var res = res_mon.getUptime();
      should.exist(res);
      console.info(res);
    });
  });
  
  describe('#getHostname()', function(){
    it('should return a value', function(){
      var res = res_mon.getHostname();
      should.exist(res);
      console.info(res);
    });
  });
  
  describe('#getPlatform()', function(){
    it('should return a value', function(){
      var res = res_mon.getPlatform();
      should.exist(res);
      console.info(res);
    });
  });
  
  describe('#getArch()', function(){
    it('should return a value', function(){
      var res = res_mon.getArch();
      should.exist(res);
      console.info(res);
    });
  });
  
  describe('#getRelease()', function(){
    it('should return a value', function(){
      var res = res_mon.getRelease();
      should.exist(res);
      console.info(res);
    });
  });
  
  describe('#getTotalMemory()', function(){
    it('should return a value', function(){
      var res = res_mon.getTotalMemory();
      should.exist(res);
      console.info(res);
    });
  });
  
  describe('#getFreeMemory()', function(){
    it('should return a value', function(){
      var res = res_mon.getFreeMemory();
      should.exist(res);
      console.info(res);
    });
  });
  
  describe('#getCpuUsage()', function(){
    it('should return a value', function(){
      var res = res_mon.getCpuUsage();
      should.exist(res);
      console.info(res);
    });
  });
  
  describe('#getMemoryUsage()', function(){
    it('should return a value', function(){
      var res = res_mon.getMemoryUsage();
      should.exist(res);
      console.info(res);
    });
  });
  
});