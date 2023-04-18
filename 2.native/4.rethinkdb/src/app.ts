'use strict'

import http from 'http'
import router from '@/router'

import { Server as SocketServer } from 'socket.io'
const { change } = useRethink()

const requestListener: http.RequestListener = (req, res) => {
  // Enable CORS before the router is started.
  
  // Set the website that is allowed to connect. Use `*` to allow any website.
  res.setHeader('Access-Control-Allow-Origin', import.meta.env.VITE_CROSS_ORIGIN)

  // Request methods you wish to allow: GET, POST, OPTIONS, PUT, PATCH, DELETE.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Set default statusCode code and content type.
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  // Don't run the router if the request method is 'OPTIONS'.
  if (req.method === 'OPTIONS') {
    res.end()
  } else {
    // Start the router and register routes.
    router.lookup(req, res)
  }
}

// Note that change feeds only can be support after built.
if (import.meta.env.PROD) {
  const host = import.meta.env.VITE_APP_HOST || '127.0.0.1'
  const port = import.meta.env.VITE_APP_PORT || '5000'
  const server = http.createServer(requestListener)

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
  change(io, 'users', 'users.changefeeds')

  server.listen(port, () => {
    console.log(`🚀 Server ready at ${host}:${port}`)
  })
}

export const viteNodeApp = requestListener
