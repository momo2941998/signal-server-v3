import express from 'express'
import { createServer } from 'http'
import {Server} from 'socket.io'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const httpServer = createServer(app)
console.log(`Process ID = ${process.pid}`)

const io = new Server();
io.attach(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log(socket.id)
  
  socket.on('chat', ({name, message}) => {
    io.sockets.emit('chat', {name, message})
  })
});
const port = process.env.PORT || 8000
httpServer.listen(port, () => console.log(`Server running on port ${port}`));