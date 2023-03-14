'use strict'

import rdb from 'rethinkdb'

export default eventHandler(async () => {
  try {
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

    // Retrieve documents.
    // https://www.rethinkdb.com/docs/guide/javascript/
    // https://rethinkdb.com/api/javascript/order_by/
    const cursor = await rdb.table('users')
      .orderBy(rdb.desc('createdAt')) // latest first
      .run(db)

    const docs = await cursor.toArray()

    // Close the db connection.
    db.close()

    return docs
  } catch (error) {
    throwError(error)
  }
})
