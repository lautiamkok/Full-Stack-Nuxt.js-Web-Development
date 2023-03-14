import { createServer } from 'node:http'
import { createApp, eventHandler, toNodeListener, handleCors } from 'h3'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'

// Import all the custom schema.
import { htmlHead, attachment, carousel, pageInfo } from '@/schema/extract/types'
import { typeDefs as Page, resolvers as pageResolvers } from '@/schema/Page'
import { typeDefs as Project, resolvers as projectResolvers } from '@/schema/Project'

// Set global types.
const Query = `
  type Query {
    hello: String
  }

  ${htmlHead}
  ${attachment}
  ${carousel}
  ${pageInfo}
`
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  }
}

const apollo = new ApolloServer({
  typeDefs: [
    Query,
    Page,
    Project
  ],
  resolvers: [
    resolvers,
    pageResolvers,
    projectResolvers
  ]
})

const app = createApp()

// Enable cors.
app.use(eventHandler(event => {
  const options = {
    origin: import.meta.env.VITE_CROSS_ORIGIN
  }
  handleCors(event, options)
}))

// Integrate Apollo Server.
app.use(
  '/',
  startServerAndCreateH3Handler(apollo)
)

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
