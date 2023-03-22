'use strict'

import { post } from '@/schema/extract/fields'
import { getItem, getItems, countItems } from '@/utils/gql/resolvers'

const typeDefs = `
  extend type Query {
    projects (
      limit: Int,
      page: Int
    ): ProjectConnection

    project (
      slug: String,
    ): Project
  }

  type Project {
    ${post}
    assets: [Attachment]
    carousels: [Carousel]
  }

  type ProjectConnection {
    edges: [ProjectEdge]
    pageInfo: PageInfo

    # Add total items here if you need it.
    # It is optional.
    total: Int 
  }

  type ProjectEdge {
    node: Project
    cursor: String
  }
`

const resolvers = {
  Query: {
    project: async (root, args) => await getItem('/wp-json/api/v1/project/', root, args),
    projects: async (root, args) => await getItems('/wp-json/api/v1/projects/', root, args)
  },

  ProjectConnection: {
    total: async (root, args) => await countItems('/wp-json/api/v1/projects/', root, args)
  }
}

export {
  typeDefs,
  resolvers
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
