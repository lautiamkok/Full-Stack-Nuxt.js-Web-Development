'use strict'

import rdb from 'rethinkdb'

export default ctxHandler(async () => {
  const { connect } = useRethink()
  
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
})
