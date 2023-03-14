'use strict'

import rdb from 'rethinkdb'

// Get the user by slug.
export default eventHandler(async event => {
  try {
    const slug = event.context.params.slug

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

    const searchQuery = {
      slug
    }

    // Retrieve documents by filter.
    // https://rethinkdb.com/api/javascript/filter/
    const doc = await rdb.table('users')
      .filter(searchQuery)
      .nth(0) // query for a stream/array element by its position
      .default(null) // will return null if no user found.
      .run(db)

    // Close the db connection.
    db.close()

    if (!doc) {
      throw createError({
        status: 404,
        statusText: `User "${slug}" not found`
      })
    }

    return doc
  } catch (error) {
    throwError(error)
  }
})
