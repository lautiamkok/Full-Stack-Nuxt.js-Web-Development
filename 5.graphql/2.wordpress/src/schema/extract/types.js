'use strict'

import { note, htmlMeta, attachmentAttributes } from '@/schema/extract/fields'

const htmlHead = `
  type HtmlMeta {
    ${htmlMeta}
  }

  type HtmlHead {
    ${htmlMeta}
    og:HtmlMeta
  }
`

const attachment = `
  type Attachment {
    id: String
    ${note}
    data: AttachmentData
  }

  type AttachmentData {
    ${attachmentAttributes}
    sizes: AttachmentSizes
  }

  type AttachmentSizes {
    medium: AttachmentAttributes
    thumbnail: AttachmentAttributes
  }

  type AttachmentAttributes {
    ${attachmentAttributes}
  }
`

const carousel = `
  type Carousel {
    ${note}
    images: [Attachment]
  }
`

// PageInfo for cursor-based pagination and offset-based pagination. Cursor
// pagination is the preferred backed method for delivering an infinite scroll
// on the frontend. 
// https://relay.dev/graphql/connections.htm
// https://graphql.org/learn/pagination/#pagination-and-edges
// https://www.apollographql.com/docs/react/pagination/cursor-based
// https://www.apollographql.com/docs/react/pagination/offset-based
const pageInfo = `
  type PageInfo {
    # Required fields for cursor-based pagination:
    hasPreviousPage: Boolean
    hasNextPage: Boolean
    startCursor: String
    endCursor: String

    # Required fields for offset-based pagination:
    previousPage: String
    nextPage: String
    currentPage: String
    totalPages: String
  }
`

export {
  htmlHead,
  attachment,
  carousel,
  pageInfo
}
