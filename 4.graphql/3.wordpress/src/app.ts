'use strict'

import http from 'http'
import { graphql } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'

// Import merged type defs and resolvers.
import { typeDefs, resolvers } from '@/schema'

// Create a GraphQL.js GraphQLSchema instance from GraphQL schema language using
// the function `makeExecutableSchema`.
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const isProd = import.meta.env.PROD

// Create a HTTP server using the listener on `/` or `/graphql`.
const requestListener: http.RequestListener = async (req, res) => {
  // Enable CORS.
  // Website you wish to allow to connect.
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow: GET, POST, OPTIONS, PUT, PATCH, DELETE.
  res.setHeader('Access-Control-Allow-Methods', 'POST')

  // Request headers you wish to allow.
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200

  // Don't run the code if the request method is 'OPTIONS'.
  if (req.method === 'OPTIONS') {
    res.end()
  } else {
    if (req.method === 'GET') {
      res.end('{"message":"GraphQL API is ready!"}')
    } else if (
      req.method === 'POST' && (
        req.url === '/' || req.url.startsWith('/graphql')
      )
    ) {
      // Define a context value to be shared across resolvers.
      const contextValue = {
        something: 'something to be shared'
      }

      const source =  (await normalizeBody(req)).query
      const response = await graphql({
        schema,
        source,
        contextValue
      })
      res.end(JSON.stringify(response))
    } else {
      res.statusCode = 404
      res.end('{"message":"page not found!"}')
    }
  }
}

if (import.meta.env.PROD) {
  const host = import.meta.env.VITE_APP_HOST || '127.0.0.1'
  const port = import.meta.env.VITE_APP_PORT || '5000'
  const server = http.createServer(requestListener)
  server.listen(port, () => {
    console.log(`🚀 Server ready at ${host}:${port}`)
  })
}

export const viteNodeApp = requestListener
