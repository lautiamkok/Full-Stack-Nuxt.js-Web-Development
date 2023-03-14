'use strict'

// Handle cors.
// https://www.jsdocs.io/package/h3#handleCors
// https://unpkg.com/browse/h3@1.5.0/dist/index.d.ts#L365
export default defineEventHandler(event => {
  const options = {
    origin: import.meta.env.CROSS_ORIGIN
  }
  handleCors(event, options)
})
