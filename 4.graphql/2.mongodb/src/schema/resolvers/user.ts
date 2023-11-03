'use strict'

import { getItem, getItems, countItems } from '@/utils/gql/resolvers'

export default {
  Query: {
    user: async (root, args) => await getItem('users', root, args),
    users: async (root, args) => await getItems('users', root, args),
    total: async (root, args) => await countItems('users', root, args)
  },

  User: {
    createdAt: root => {
      // Convert a BSON timestamp created from `new Timestamp()` to a UNIX
      // timestamp. for example a value of `new Timestamp({ t: 1692466633, i:
      // 1 })` to `1692466633000`.
      // Read more:
      // https://www.mongodb.com/docs/v7.0/reference/bson-types/#timestamps
      // https://mongodb.github.io/node-mongodb-native/api-bson-generated/timestamp.html#:~:text=getHighBits,bits%20as%20a%20signed%20value.
      if (
        typeof root.createdAt === 'object' && 
        root.createdAt.constructor.name === 'Timestamp'
      ) {
        // Return the high 32-bits value.
        // 1692466633 * 1000
        return root.createdAt.getHighBits() * 1000

        // Or, use the object key:
        console.log(Object.keys(root.createdAt))
        // [ 'low', 'high', 'unsigned' ]
        
        console.log(root.createdAt.high)
        console.log(root.createdAt['high'])
        // 1692466633
      }
      return root.createdAt
    }
  }
}
