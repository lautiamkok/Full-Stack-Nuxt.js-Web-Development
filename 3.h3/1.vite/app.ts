import { createServer } from 'node:http'
import { 
  createApp, 
  eventHandler, 
  toNodeListener, 
  createRouter, 
  fromNodeMiddleware
} from 'h3'
import serveStatic from 'serve-static'

const router = createRouter()
  .get(
    '/',
    eventHandler(() => {
      return {
        message: 'Hello world!!'
      }
    })
  )
  .get(
    '/hello/:name',
    eventHandler((event) => `Hello ${event.context.params.name}!`)
  )

const app = createApp()

// Serve routes.
app.use(router)

// Serve static assets. For examples:
// http://localhost:3000/vite.svg
// http://localhost:3000/R0003515.jpg
// http://localhost:3000/fixtures/hello.txt
// Read more about serving static assets:
// https://github.com/unjs/h3/issues/31
app.use(fromNodeMiddleware(serveStatic(`./public`)))

// https://github.com/axe-me/vite-plugin-node/blob/main/examples/node/app.ts
const requestListener = toNodeListener(app)

if (import.meta.env.PROD) {
  const server = createServer(requestListener)
  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  })
}

export const viteNodeApp = requestListener
