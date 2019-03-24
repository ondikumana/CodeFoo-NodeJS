
// const SERVER_IP_ADDRESS = '157.230.84.99';
const SERVER_IP_ADDRESS = 'db';

// const express = require('express')
const path = require('path')
const async = require("async")
const bodyParser = require('body-parser')
const cors = require('cors')

var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

//socket stuff
// var io = require('socket.io')(9999)


const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: SERVER_IP_ADDRESS,
  database: 'postgres',
  password: 'password',
  port: 5432,
})

const connectToDatabase = async () => {

  let connectionRetries = 5

  while (connectionRetries) {
    try {
      await client.connect()
      break;
    }
    catch (error) {
      console.log(error)
      connectionRetries--
      console.log(`connectionRetries left: ${connectionRetries}`)

      // waits five seconds before trying again
      await new Promise(res => setTimeout(res, 5000))
    }
  }

}

connectToDatabase()

cors({ credentials: true, origin: true })
app.use(cors())


// to read body parser required
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


server.listen(9999, () => console.log('\nCodeFoo NodeJS listening on port %s\nPress Ctrl-C to quit...\n', server.address().port));

let sessionInfo = {}

// routes in different files
require('./src/User/User')(app, client)
require('./src/Session/Session')(app, client, io, sessionInfo)
require('./src/Message/Message')(app, client, io, sessionInfo)
require('./src/Socket/Socket')(app, client, io, sessionInfo)

