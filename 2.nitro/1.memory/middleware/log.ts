'use strict'

// https://nuxt.com/docs/guide/directory-structure/server#server-middleware
export default defineEventHandler(event => {
  console.log('New request: ' + event.node.req.url)
})
