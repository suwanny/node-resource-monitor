
express = require('express')
NodeResourceMonitor = require('./node_resource_monitor')

class Server
  constructor: () ->
    app = express()
    app.use(express.bodyParser())
    app.use(express.methodOverride())
    app.use(app.router)
    app.use(express.static(__dirname + '/../public'))
    app.set('views', __dirname + '/../views')
    app.set('view engine', 'ejs')
    @app = app
    @monitor = new NodeResourceMonitor()
    @setRoutes()


  setRoutes: () ->
    app = @app
    self = this

    app.get '/', (req, res) ->
      res.render 'index', {title: 'Node Resource Monitor'}

    app.get '/data', (req, res) ->
      res.json self.monitor.get()
    
    

  start: () ->
    @app.listen(5000)
    @monitor.start(1000)
    console.log("Server is listening to 5000")
  
  shutdown: () ->
    @app.close()
    @monitor.stop()
  
  


module.exports = Server  
  