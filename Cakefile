
{exec}  = require 'child_process'

# Helper functions
run_command = (command) ->
  console.log "run: #{command}"
  exec command, (err, stdout, stderr) ->
    throw err if err
    output = stdout + stderr
    console.log output if output.length > 0

# Cake tasks
task 'init', 'Initialize the app', ->
  run_command 'npm install'
  
task 'build', 'Build project from app/*.coffee to lib/*.js', ->
  run_command 'coffee --lint -cb -o lib/ src/'

task 'compile', 'Compile coffee-script to javascript', ->
  invoke 'build'

task 'test', 'Run unit tests with mocha', ->
  invoke 'build'
  run_command 'mocha -R spec --recursive spec'

