'use strict'

import { post } from '@/schema/extract/fields'
import { getItem } from '@/utils/gql/resolvers'

const typeDefs = `
  extend type Query {
    page (
      slug: String,
    ): Page
  }

  type Page {
    ${post}
  }
`

const resolvers = {
  Query: {
    page: async (root, args) => await getItem('/wp-json/api/v1/page/', root, args),
  }
}

export {
  typeDefs,
  resolvers
}
