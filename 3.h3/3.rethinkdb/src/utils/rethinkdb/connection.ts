'use strict'

import rethink from 'rethinkdb'

const c = async () => {
  // https://rethinkdb.com/api/javascript/connect/
  const connection = await rethink.connect({
    host: import.meta.env.VITE_DB_HOST,
    port: import.meta.env.VITE_DB_PORT,
    db: import.meta.env.VITE_DB_DBNAME
  })
  return connection
}

export default c
