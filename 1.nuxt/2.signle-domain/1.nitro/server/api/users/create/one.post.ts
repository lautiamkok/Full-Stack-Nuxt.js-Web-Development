'use strict'

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

  // Current timestamp.
  const timestamp = Date.now()

  const user = {
    name: body.name,
    slug: body.slug,
    email: body.email,
    createdAt: timestamp
  }

  const db = makeDb()
  const users = await db.getItem('users') || []
  users.push(user)
  await db.setItem('users', users)
  return user
})
