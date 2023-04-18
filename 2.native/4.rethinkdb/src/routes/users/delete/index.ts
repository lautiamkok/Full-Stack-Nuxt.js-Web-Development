'use strict'

import rdb from 'rethinkdb'

// Delete a user by id:
// $ curl -X DELETE http://localhost:5000/users/delete/64395e2192f43f9e8221932c
export default ctxHandler(async ctx => {
  const { connect } = useRethink()
  const id = ctx.params.id

  // Get the db connection.
  const db = await connect()

  // Throw the error if the table does not exist.
  const exists = await rdb.tableList().contains('users').run(db)
  if (exists === false) {
    createError({
      statusCode: 500,
      message: '"users" table does not exist'
    })
  }

  // Find one doc.
  const found = await rdb.table('users')
    .get(id)
    .run(db)
  if (!found) {
    createError({
      statusCode: 404,
      message: `User "${id}" does not exist`
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
    createError({
      statusCode: 500,
      message: `Delete user failed`
    })
  }

  return doc
})
