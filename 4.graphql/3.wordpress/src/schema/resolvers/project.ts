'use strict'

import { getItem, getItems, countItems } from '@/utils/gql/resolvers'

export default {
  Query: {
    project: async (root, args) => await getItem('/wp-json/api/v1/project/', root, args),
    projects: async (root, args) => await getItems('/wp-json/api/v1/projects/', root, args)
  },

  ProjectConnection: {
    total: async (root, args) => await countItems('/wp-json/api/v1/projects/', root, args)
  }
}

// Example query:
// query {
//   projects(page: 1) {
//     total
//     edges {
//       node {
//         post_title
//         featured_image
//       }
//     }
//     pageInfo {
//       currentPage
//       previousPage
//       nextPage
//       totalPages
//     }
//   }
// }
