'use strict'

import { htmlHead, attachment, carousel, pageInfo } from '@/schema/extract/types'
import { typeDefs as Page, resolvers as pageResolvers } from '@/schema/Page'
import { typeDefs as Project, resolvers as projectResolvers } from '@/schema/Project'

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

export {
  typeDefs,
  resolvers
}
