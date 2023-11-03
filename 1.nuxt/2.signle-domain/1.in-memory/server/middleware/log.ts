'use strict'

// https://nuxt.com/docs/guide/directory-structure/server#server-middleware
export default defineEventHandler(event => {
  console.log('Request URL: ' + event.node.req.url)
})
