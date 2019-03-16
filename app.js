
const SERVER_IP_ADDRESS = '157.230.84.99';

const express = require('express')
const path = require('path')
const async = require("async")
const bodyParser = require('body-parser')
const cors = require('cors')

var app = express()

const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: SERVER_IP_ADDRESS,
  database: 'master',
  password: 'password',
  port: 5432,
})

client.connect()

cors({credentials: true, origin: true})
app.use(cors())


// to read body parser required
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes in different files

require('./src/User/User')(app, client)


const server = app.listen(process.env.PORT || 3000, () => console.log('\nCodeFoo NodeJS listening on port %s\nPress Ctrl-C to quit...\n', server.address().port) );

