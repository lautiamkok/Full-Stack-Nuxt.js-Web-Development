'use strict'

import { createServer } from 'node:http'
import { 
  createApp, 
  toNodeListener, 
  handleCors
} from 'h3'
import { Server as SocketServer } from 'socket.io'

import rdbChangeFeeds from './utils/rethinkdb/changefeeds'

// Import routes.
import router from './router'

// Create app.
const app = createApp()

// Enable cors.
app.use(eventHandler(event => {
  const options = {
    origin: import.meta.env.VITE_CROSS_ORIGIN
  }
  handleCors(event, options)
}))

// Serve routes.
app.use(router)

// https://github.com/axe-me/vite-plugin-node/blob/main/examples/node/app.ts
const requestListener = toNodeListener(app)

if (import.meta.env.PROD) {
  const host = import.meta.env.VITE_APP_HOST || '127.0.0.1'
  const port = import.meta.env.VITE_APP_PORT || '3000'
  const server = createServer(requestListener)

  // Hook socket.io up. Verify:
  // $ curl "http://localhost:5000/socket.io/?EIO=4&transport=polling" -v -H "origin: http://localhost:3000"
  // https://socket.io/docs/v4/server-initialization#with-an-http-server
  const io = new SocketServer(server, {
    // Cross origins requirements - explicitly enable CORS.
    // https://socket.io/docs/v4/handling-cors/
    cors: {
      origin: import.meta.env.VITE_CROSS_ORIGIN
    }
  })

  io.sockets.on('connection', socket => {
    console.log('a user connected: ' + socket.id)

    // Broadcast to the client.
    io.emit('emit.onserver', 'Hi client, what you up to?')
    console.log('Message to client: ' + socket.id)

    // Listen on the client.
    socket.on('emit.onclient', message => {
      console.log('Message from client, ' + socket.id + ': ' + message)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected: ' + socket.id)
    })
  })

  // Integrate socket and rethinkdb.
  // It should be done only once globally.
  rdbChangeFeeds(io, 'users', 'users.changefeeds')

  server.listen(port, () => {
    console.log(`🚀 Server ready at ${host}:${port}`)
  })
}

export const viteNodeApp = requestListener
