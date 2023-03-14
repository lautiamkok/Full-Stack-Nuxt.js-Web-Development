'use strict'

// Add a user:
// $ curl -d "name=John&slug=john" -X POST http://localhost:5000/users/create
export default eventHandler(async event => {
  try {
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
        statusText: `slug is required`
      })
    }

    // Connect to the db.
    const { client, db } = await connect()

    // Get the collection.
    const collectionUsers = db.collection('users')

    // Find one doc.
    const found = await collectionUsers.findOne({
      slug: body.slug
    })
    if (found) {
      throw createError({
        status: 400,
        statusText: `slug "${body.slug}" has been taken`
      })
    }

    // Current timestamp.
    const timestamp = Date.now()

    // Insert a doc.
    const doc = await collectionUsers.insertOne({
      name: body.name,
      slug: body.slug,
      // username: body.username,
      // password: body.password,
      email: body.email,
      createdAt: timestamp
    })

    // Close the db.
    close(client)

    return doc
  } catch (error) {
    throwError(error)
  }
})
