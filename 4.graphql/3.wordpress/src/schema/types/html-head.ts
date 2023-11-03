'use strict'

import htmlMeta from '@/schema/fields/html-meta'

export default `
  type HtmlMeta {
    ${htmlMeta}
  }

  type HtmlHead {
    ${htmlMeta}
    og:HtmlMeta
  }
`
