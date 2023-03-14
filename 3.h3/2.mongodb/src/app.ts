'use strict'

import { createServer } from 'node:http'
import { 
  createApp, 
  toNodeListener, 
  handleCors
} from 'h3'

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
  server.listen(port, () => {
    console.log(`🚀 Server ready at ${host}:${port}`)
  })
}

export const viteNodeApp = requestListener
