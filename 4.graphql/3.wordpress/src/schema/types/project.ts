'use strict'

import post from '@/schema/fields/post'

export default `
  type Query {
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
