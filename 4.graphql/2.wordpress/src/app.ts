'use strict'

import http from 'http'
import url from 'url'
import { HeaderMap, ApolloServer } from '@apollo/server'
import { 
  ApolloServerPluginLandingPageLocalDefault, 
  ApolloServerPluginLandingPageProductionDefault 
} from '@apollo/server/plugin/landingPage/default'

// Import all the custom schema.
import { htmlHead, attachment, carousel, pageInfo } from '@/schema/extract/types'
import { typeDefs as Page, resolvers as pageResolvers } from '@/schema/Page'
import { typeDefs as Project, resolvers as projectResolvers } from '@/schema/Project'

const isProd = import.meta.env.PROD

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

async function bootstrap () {
  const server = new ApolloServer({
    typeDefs: [
      Query,
      Page,
      Project
    ],
    resolvers: [
      resolvers,
      pageResolvers,
      projectResolvers
    ],
    plugins: [
      // Install a landing page plugin based.
      // https://www.apollographql.com/docs/apollo-server/api/plugin/landing-pages/
      isProd
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault(),
    ]
  })

  await server.start()

  // https://www.apollographql.com/docs/apollo-server/integrations/building-integrations
  const requestListener: http.RequestListener = async (req, res) => {
    // console.log(`${req.method} ${req.url}`)

    // Enable CORS.
    // Website you wish to allow to connect.
    // https://www.apollographql.com/docs/apollo-server/security/cors/
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow: GET, POST, OPTIONS, PUT, PATCH, DELETE.
    res.setHeader('Access-Control-Allow-Methods', 'POST')

    // Request headers you wish to allow.
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    if (req.method === 'POST') {
      req.body = await normalizeBody(req)
    }

    // Integrate Node.js HTTP server with Apollo. Copy the Apollo part from:
    // https://www.apollographql.com/docs/apollo-server/integrations/building-integrations
    const headers = new HeaderMap()
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        headers.set(key, Array.isArray(value) ? value.join(', ') : value)
      }
    }

    const httpGraphQLRequest: HTTPGraphQLRequest = {
      method: req.method.toUpperCase(),
      headers,
      body: req.body,
      search: url.parse(req.url).search ?? '',
    }

    const httpGraphQLResponse = await server
    .executeHTTPGraphQLRequest({
      httpGraphQLRequest,
      context: () => ({}),
    })

    for (const [key, value] of httpGraphQLResponse.headers) {
      res.setHeader(key, value)
    }

    // https://nodejs.org/docs/latest/api/http.html#responsestatuscode
    res.statusCode = httpGraphQLResponse.statusCode || 200
    
    let string = null
    if (httpGraphQLResponse.body.kind === 'complete') {
      string = httpGraphQLResponse.body.string
    }

    if (req.url === '/') {
      res.end(httpGraphQLResponse.body.string)
      return
    }

    if (req.url === '/graphql') {
      // https://nodejs.org/docs/latest/api/http.html#responsesetheadername-value
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(string)
      return
    }

    res.end()
  }

  if (isProd) {
    const host = import.meta.env.VITE_APP_HOST || '127.0.0.1'
    const port = import.meta.env.VITE_APP_PORT || '5000'
    const server = http.createServer(requestListener)
    server.listen(port, () => {
      console.log(`🚀 Server ready at ${host}:${port}`)
    })
  }

  return requestListener
}

const requestListener = bootstrap()
export const viteNodeApp = requestListener
