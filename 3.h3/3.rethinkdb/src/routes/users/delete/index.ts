'use strict'

import rdb from 'rethinkdb'

// Delete a user by id:
// $ curl -X DELETE http://localhost:5000/users/delete/{id}
export default eventHandler(async event => {
  try {
    const id = event.context.params.id

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

    // Find one doc.
    const found = await rdb.table('users')
      .get(id)
      .run(db)
    if (!found) {
      throw createError({
        status: 404,
        statusText: `User "${id}" does not exist`
      })
    }

    // Delete a single document by id.
    // https://rethinkdb.com/api/javascript/delete/
    const doc = await rdb.table('users')
      .get(id)
      .delete()
      .run(db)

    // Close the db connection.
    db.close()

    // Delete all documents.
    // await rdb.table('users').delete().run(db)

    if (doc.deleted !== 1) {
      throw createError({
        status: 500,
        statusText: `Delete user failed`
      })
    }

    return doc
  } catch (error) {
    throwError(error)
  }
})
