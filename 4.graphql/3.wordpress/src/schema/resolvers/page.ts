'use strict'

import { getItem } from '@/utils/gql/resolvers'

export default {
  Query: {
    page: async (root, args) => await getItem('/wp-json/api/v1/page/', root, args),
  }
}

// Example query:
// query {
//   page(slug: "projects") {
//     ID
//     post_title
//   }
// }
