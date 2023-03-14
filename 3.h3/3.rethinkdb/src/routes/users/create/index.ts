'use strict'

import rdb from 'rethinkdb'

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

    // Get the db connection.
    const db = await connection()

    // Throw the error if the table does not exist.
    const exists = await rdb.tableList().contains('users').run(db)
    if (exists === false) {
      throw createError({
        status: 500,
        statusText: `"users" table does not exist`
      })
    }

    // Check if the provided slug is taken.
    const searchQuery = {
      slug: body.slug
    }
    const found = await rdb.table('users')
      .filter(searchQuery)
      .nth(0) // query for a stream/array element by its position
      .default(null) // will return null if no user found.
      .run(db)

    if (found) {
      throw createError({
        status: 400,
        statusText: `slug "${body.slug}" has been taken`
      })
    }

    // Current timestamp.
    const timestamp = Date.now()
    const options = {
      name: body.name,
      slug: body.slug,
      createdAt: timestamp
    }

    // Insert a doc.
    // https://rethinkdb.com/api/javascript/insert
    const doc = await rdb.table('users')
      .insert(options, { returnChanges: true })
      .run(db)

    // Close the db connection.
    db.close()

    if (doc.inserted !== 1) {
      throw createError({
        status: 500,
        statusText: `Add user failed`
      })
    }

    return doc
  } catch (error) {
    throwError(error)
  }
})
