
os = require('os')
_  = require('lodash')

class NodeResourceMonitor
  constructor: (@maxPoints=500) ->
    @data = {
      timestamp:      [],
      totalMemory:    [],
      freeMemory:     [],
      cpuUser:        [],
      cpuSys:         [],
      cpuIdle:        [],
      memRss:         [],
      memHeapTotal:   [],
      memHeapUsed:    []
    }
    @timer = undefined
  
  getTimestamp: () -> 
    parseInt (new Date().getTime())
  
  getUptime:      () -> os.uptime()
  getHostname:    () -> os.hostname()
  getPlatform:    () -> os.platform()
  getArch:        () -> os.arch()
  getRelease:     () -> os.release()
  
  # System Resource
  
  getTotalMemory: () -> os.totalmem()
  getFreeMemory:  () -> os.freemem()
  getCpuUsage:    () ->
    init_val  = {user:0, sys: 0, idle: 0, total: 0}
    fn_reduce = (mem, val) ->
      times     = val.times
      mem.user  += times.user
      mem.sys   += times.sys
      mem.idle  += times.idle
      mem
    usage = _.reduce(os.cpus(), fn_reduce, init_val)
    usage.total  = (usage.user + usage.sys + usage.idle)
    usage
  
  #
  # { rss: 25886720,
  #   heapTotal: 17603072,
  #   heapUsed: 8447832 }
  getMemoryUsage: () -> process.memoryUsage()


  makeDataPoints: () ->
    cpuUsage = @getCpuUsage()
    memUsage = @getMemoryUsage()

    {
      timestamp:      @getTimestamp(),
      totalMemory:    @getTotalMemory(),
      freeMemory:     @getFreeMemory(),
      cpuUser:        parseInt(cpuUsage.user * 100 /cpuUsage.total, 10),
      cpuSys:         parseInt(cpuUsage.sys * 100 /cpuUsage.total, 10),
      cpuIdle:        parseInt(cpuUsage.idle * 100 /cpuUsage.total, 10),
      memRss:         memUsage.rss,
      memHeapTotal:   memUsage.heapTotal,
      memHeapUsed:    memUsage.heapUsed
    }
  
  
  collectData: () ->
    data = @makeDataPoints()
    if @data.timestamp.length > @maxPoints
      @data.timestamp.shift()
      @data.totalMemory.shift()
      @data.freeMemory.shift()
      @data.cpuUser.shift()
      @data.cpuSys.shift()
      @data.cpuIdle.shift()
      @data.memRss.shift()
      @data.memHeapTotal.shift()
      @data.memHeapUsed.shift()

    @data.timestamp.push    data.timestamp
    @data.totalMemory.push  data.totalMemory
    @data.freeMemory.push   data.freeMemory
    @data.cpuUser.push      data.cpuUser
    @data.cpuSys.push       data.cpuSys
    @data.cpuIdle.push      data.cpuIdle
    @data.memRss.push       data.memRss
    @data.memHeapTotal.push data.memHeapTotal
    @data.memHeapUsed.push  data.memHeapUsed

  
  
  # interval: the collecting intervale (default: 5 seconds)
  # max_points: 8640 points can store last 12 hours with 5 seconds interval
  # 
  # if the timer doesn't exist, empty arrays. 
  start: (interval=5000) ->
    return if @timer?
    fnCollect = () =>
      @collectData()

    setInterval(fnCollect, interval)
    
  
  # stop collecting .. 
  stop: () ->
    clearInterval(@timer)
    @timer = undefined
  
  
  get: () -> @data
  
  

module.exports = NodeResourceMonitor
  