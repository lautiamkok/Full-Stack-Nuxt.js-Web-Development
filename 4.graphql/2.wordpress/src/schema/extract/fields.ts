'use strict'

const note = `
  title: String
  description: String
`

const post = `
  ID: String
  post_title: String
  post_name: String
  post_excerpt: String
  post_content: String
  post_date: String
  post_type: String
  post_author: String
  featured_image: String
  head: HtmlHead
`

const htmlMeta = `
  title: String
  description: String
  keywords: String
  type: String
  image: String
`

// Media resources: pictures, audios, and videos.
// type: picture, audio or video, default: picture
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
const attachmentAttributes = `
  width: Int
  height: Int
  file: String
  url: String
  mime_type: String
`

export {
  note,
  post,
  htmlMeta,
  attachmentAttributes,
}
