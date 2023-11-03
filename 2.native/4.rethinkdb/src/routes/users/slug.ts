'use strict'

import rdb from 'rethinkdb'

// Get the user by slug.
export default ctxHandler(async (ctx) => {
  const { connect } = useRethink()
  const slug = ctx.params.slug

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
    createError({
      statusCode: 404,
      message: `User "${slug}" not found`
    })
  }

  return doc
})
