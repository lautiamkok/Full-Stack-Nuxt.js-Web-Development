'use strict'

export default `
  type Query {
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
