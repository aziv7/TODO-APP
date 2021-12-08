const express = require('express')
require('dotenv').config()
const errorHandler=require('./middleware/errorHandler')
const cors = require('cors')
const connect=require('./db/connect')
const userRoutes=require('./routes/user')
const todoRoutes=require('./routes/todo')

const server = express()
server.use(express.json())

server.use('/api/todos', todoRoutes)
server.use('/api/users', userRoutes)

server.use(cors())
server.options('http://localhost', cors())
server.use(errorHandler)


connect()
const port=process.env.PORT|| 3000
server.listen(port , () => {
    console.log('server is running on http://localhost:' + port)
  })