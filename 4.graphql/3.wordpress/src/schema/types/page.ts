'use strict'

import post from '@/schema/fields/post'

export default `
  type Query {
    page (
      slug: String,
    ): Page
  }

  type Page {
    ${post}
  }
`
