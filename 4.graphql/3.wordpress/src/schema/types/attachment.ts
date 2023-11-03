'use strict'

import attachmentAttributes from '@/schema/fields/attachment-attributes'

export default `
  type Attachment {
    id: String
    title: String
    description: String
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
