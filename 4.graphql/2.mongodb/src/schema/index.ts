'use strict'

// Glob imports and merge:
// https://the-guild.dev/graphql/tools/docs/schema-merging#manual-imports
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

const typesArray = []
const resolversArray = []

const globTypes = import.meta.globEager('./types/**')
const globResolvers = import.meta.globEager('./resolvers/**')

// Loop types and resolvers, and push them into the array.
Object.entries(globTypes).forEach(([path, type]) => 
  typesArray.push(type.default)
)
Object.entries(globResolvers).forEach(([path, resolver]) => 
  resolversArray.push(resolver.default)
)

const typeDefs = mergeTypeDefs(typesArray)
const resolvers = mergeResolvers(resolversArray)

// Manually import types and resolvers.
// import helloType from '@/schema/types/hello'
// import userType from '@/schema/types/user'
// import userResolvers from '@/schema/resolvers/user'
// import helloResolvers from '@/schema/resolvers/hello'
// const typeDefs = mergeTypeDefs([helloType, userType])
// const resolvers = mergeResolvers([helloResolvers, userResolvers])

export {
  typeDefs,
  resolvers
}
