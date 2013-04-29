
os = require('os')
_  = require('lodash')

class NodeResourceMonitor
  constructor: () ->
    @data = {
      timestamp:      [],
      total_memory:   [],
      free_memory:    [],
      cpu_user:       [],
      cpu_sys:        [],
      cpu_idle:       [],
      mem_rss:        [],
      mem_heap_total: [],
      mem_heap_used:  []
    }
  
  getTimestamp: () -> 
    parseInt (new Date().getTime())/1000
  
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

  # interval: the collecting intervale (default: 5 seconds)
  # max_points: 8640 points can store last 12 hours with 5 seconds interval
  # 
  # if the timer doesn't exist, empty arrays. 
  start: (interval=5000, max_points=8640) ->
    # body...
  
  # stop collecting .. 
  stop: () ->
    # body...
  
  
  get: () ->
    # body...
  
  

module.exports = NodeResourceMonitor
  