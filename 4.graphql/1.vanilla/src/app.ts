'use strict'

// Only GraphQL over HTTP. `graphql-http` is used for library authors and simple
// server setups, without any additional features (like playgrounds or GUIs).
// If you want a feature-full server with bleeding edge technologies, you can
// use a server like `apollo-server`.

import http from 'http'
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'

const isProd = import.meta.env.PROD

const planets = [
  { id: 3, name: "earth", age: 4543000000, population: 8045311447 },
  { id: 4, name: "mars", age: 4603000000, population: 0 }
]

const authors = [
  { id: 1, name: 'Jane' },
  { id: 2, name: 'John' },
  { id: 3, name: 'Molly' }
]

const posts = [
  { id: 1, title: 'Post 1', authorId: 1 },
  { id: 2, title: 'Post 2', authorId: 1 },
  { id: 3, title: 'Post 3', authorId: 2 },
  { id: 4, title: 'Post 4', authorId: 3 }
]

// Default resolver
// https://www.apollographql.com/docs/graphql-tools/resolvers/
// https://www.apollographql.com/docs/graphql-tools/resolvers/#default-resolver
// You don't need to specify resolvers for every type in your schema. If you
// don't specify a resolver, GraphQL.js falls back to a default one, which
// does the following:

// 1. Returns a property from obj with the relevant field name, or
// 2. Calls a function on obj with the relevant field name and passes the query arguments into that function

// So, in the example query above, the name and title fields wouldn't need a
// resolver if the Post and Author objects retrieved from the backend already
// had those fields.

// Custom type: Planet
const Planet = new GraphQLObjectType({
  name: 'Planet',
  fields: {
    id: { 
      type: GraphQLInt,
      resolve: (root, orgs, context, info) => root.id
    },
    name: { 
      type: GraphQLString,
      resolve: (root, orgs, context, info) => root.name
    },
    age: { 
      type: GraphQLString,
      resolve: (root, orgs, context, info) => root.age
    },
    population: { 
      type: GraphQLString,
      resolve: (root, orgs, context, info) => root.population
    }
  }
})

// Custom type: Author
const Author = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { 
      type: GraphQLInt,
      resolve: (root, orgs, context, info) => root.id
    },
    name: { 
      type: GraphQLString,
      resolve: (root, orgs, context, info) => root.name
    }
  }
})

// Custom type: Post
const Post = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    author: {
      type: Author,
      resolve (root) {
        return authors.find(author => author.id === root.authorId)
      }
    }
  }
})

// The Query type.
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: (root, args, context, info) => 'world',
      },
      greet: {
        type: GraphQLString,

        // `args` describes the arguments that the `greet` query accepts
        args: {
          name: { type: GraphQLString }
        },
        resolve: (root, { name }, context, info) => {
          if (!name) {
            name = 'world!'
          }
          return 'Hello ' + name
        },
      },

      planet: {
        type: Planet,
        args: {
          name: { type: GraphQLString }
        },
        resolve (root, args, context, info) {
          return planets.find(planet => planet.name === args.name)
        },
      },

      posts: {
        type: new GraphQLList(Post),
        resolve: (root, args, context, info) => posts,
      },

      post: {
        type: Post,
        args: {
          id: { type: GraphQLInt }
        },
        resolve (root, args, context, info) {
          return posts.find(post => post.id === args.id)
        }
      }
    }
  })
})

// Do not use use `buildSchema` from `graphql`. Read more:
// https://stackoverflow.com/questions/53984094/notable-differences-between-buildschema-and-graphqlschema

// Use `makeExecutableSchema` from `@graphql-tools/schema` for example. Read more:
// https://github.com/ardatan/graphql-tools
// https://the-guild.dev/graphql/tools/docs/generate-schema

// Describe the schema as a GraphQL type language string:
const typeDefs = `
  type Planet {
    id: Int
    name: String
    age: String
    population: String
  }

  type Post {
     id: Int
     title: String
     author: Author
  }

  type Author {
     id: Int
     name: String
  }

  type Query {
    hello: String
    greet(name: String): String
    planet(name: String): Planet
    posts: [Post]
    post(id: Int): Post
  }
`

// Define resolvers as a nested object that maps type and field names to resolver functions:
var resolvers = {
  Query: {
    hello: (root, args, context, info) => {
      return "Hello world!"
    },

    greet: (root, args, context, info) => {
      return 'Hello ' + args.name
    },

    // planet: (root, args, context, info) => {
    //   return planets.find(planet => planet.name === args.name)
    // },
    // Or:
    planet (root, args, context, info) {
      return planets.find(planet => planet.name === args.name)
    },

    posts: (root, args, context, info) => posts,

    post (root, args, context, info) {
      return posts.find(post => post.id === args.id)
    }
  },

  // Custom resolvers.
  Post: {
    // author (root, args, context, info) {
    //   return authors.find(author => author.id === root.authorId)
    // }
    // Or:
    author: root => authors.find(author => author.id === root.authorId)
  }
}

// Create a GraphQL.js GraphQLSchema instance from GraphQL schema language using
// the function `makeExecutableSchema`.
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Create a HTTP server using the listener on `/` or `/graphql`.
const requestListener: http.RequestListener = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200

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
      // Use `graphql` alone:
      // schema,

      // Use `graphql` with `@graphql-tools/schema`:
      schema: executableSchema,

      source,
      contextValue
    })
    res.end(JSON.stringify(response))
  } else {
    res.statusCode = 404
    res.end('{"message":"page not found!"}')
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
