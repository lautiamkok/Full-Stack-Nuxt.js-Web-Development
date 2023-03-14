'use strict'

import rdb from 'rethinkdb'

// Update a user by id:
// $ curl -d "name=Johnny&slug=john" -X PUT http://localhost:5000/users/update/{id}
export default eventHandler(async event => {
  try {
    const id = event.context.params.id
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
        statusText: '"users" table does not exist'
      })
    }

    // Find one doc except itself.
    // https://rethinkdb.com/api/javascript/filter
    // https://rethinkdb.com/api/javascript/ne
    const found = await rdb.table('users')
      .filter(
        rdb.row('slug').eq(body.slug) // equal
      )
      .filter(
        rdb.row('id').ne(id) // but not equal itself
      )
      .nth(0) // query for a stream/array element by its position
      .default(null) // will return null if no user found.
      .run(db)
    if (found) {
      throw createError({
        status: 400,
        statusText: `slug "${body.slug}" has been taken`
      })
    }

    // Get the current doc.
    const currentDocument = await rdb.table('users')
      .get(id)
      .run(db)

    // Prepare the update query.
    const timestamp = Date.now()
    const updateQuery = {
      name: body.name,
      slug: body.slug,
      updatedAt: timestamp
    }

    // Merge two objects.
    const options = { ...currentDocument, ...updateQuery }

    // Update document by id.
    // https://rethinkdb.com/api/javascript/update/
    const doc = await rdb.table('users')
      .get(id)
      .update(options, { returnChanges: true })
      .run(db)

    // Close the db connection.
    db.close()

    if (doc.replaced !== 1) {
      throw createError({
        status: 500,
        statusText: `Update user failed`
      })
    }

    return doc
  } catch (error) {
    throwError(error)
  }
})
