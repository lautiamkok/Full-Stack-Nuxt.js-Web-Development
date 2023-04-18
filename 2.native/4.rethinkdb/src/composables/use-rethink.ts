'use strict'

import rdb from 'rethinkdb'

const connect = async () => {
  // https://rethinkdb.com/api/javascript/connect/
  const connection = await rdb.connect({
    host: import.meta.env.VITE_DB_HOST,
    port: import.meta.env.VITE_DB_PORT,
    db: import.meta.env.VITE_DB_DBNAME
  })
  return connection
}

async function change (io, tableName, eventName) {
  try {
    // Get the db connection.
    const connection = await connect()

    // Subscribe to user table's changefeed.
    const cursor = await rdb.table(tableName)
      .changes()
      .run(connection)

    cursor.each(function (err, row) {
      if (err) {
        throw err
      }
      console.log(JSON.stringify(row, null, 2))
      io.emit(eventName, row)
    })
  } catch (err) {
    console.error(err)
  }
}

export default () => {
  return {
    connect,
    change
  }
}

