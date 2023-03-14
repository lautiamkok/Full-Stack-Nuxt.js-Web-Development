'use strict'

// Use Node.js built-in `crypto` to generate UUIDs.
import crypto from 'crypto'

// Add a user:
// $ curl -d "name=John&slug=john" -X POST http://localhost:5000/users/create
// https://nitro.unjs.io/guide/introduction/routing#specific-request-method
// https://nuxt.com/docs/guide/directory-structure/server#matching-http-method
// https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
export default eventHandler(async event => {
  const body = await readBody(event)

  if (body.name === undefined) {
    // Create the error and throw it.
    // https://www.jsdocs.io/package/h3#createError
    // https://nuxt.com/docs/api/utils/create-error#createerror
    throw createError({
      status: 500,
      statusText: 'name is undefined'
    })
  }

  if (body.slug === undefined) {
    throw createError({
      status: 500,
      statusText: 'slug is undefined'
    })
  }

  if (body.name === '') {
    throw createError({
      status: 400,
      statusText: 'name is required'
    })
  }

  if (body.slug === '') {
    throw createError({
      status: 400,
      statusText: 'slug is required'
    })
  }

  const timestamp = Date.now()
  const user = {
    id: crypto.randomUUID(),
    name: body.name,
    slug: body.slug,
    createdAt: timestamp,
    updatedAt: timestamp
  }

  const query = sql(`
    INSERT INTO 'user'(
      'id',
      'name',
      'slug',
      'created_on',
      'updated_on'
      ) VALUES (
      "${user.id}",
      "${user.name}",
      "${user.slug}",
      "${user.createdAt}",
      "${user.updatedAt}"
    )
  `)

  return await mysql.query(query)
})
