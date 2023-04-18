'use strict'

import { getItem, getItems, countItems } from '@/utils/gql/resolvers'

const typeDefs = `
  extend type Query {
    user (
      slug: String,
      _id: String
    ): User

    users (
      limit: Int,
      skip: Int
    ): [User]

    total: Int
  }

  type User {
    name: String
    slug: String
    email: String
    createdAt: String
    _id: String
  }
`

const resolvers = {
  Query: {
    user: async (root, args) => await getItem('users', root, args),
    users: async (root, args) => await getItems('users', root, args),
    total: async (root, args) => await countItems('users', root, args)
  }
}

export {
  typeDefs,
  resolvers
}
