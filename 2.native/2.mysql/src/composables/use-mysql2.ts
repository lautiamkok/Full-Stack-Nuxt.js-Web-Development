'use strict'

import mysql from 'mysql2/promise'

// Use a pooling connection for all MySQL query.
// https://www.npmjs.com/package/mysql2#using-connection-pools
// https://en.wikipedia.org/wiki/Connection_pool
export default async () => {
  const pool = await mysql.createConnection({
    connectionLimit: 10,
    host: import.meta.env.VITE_DB_HOST,
    user: import.meta.env.VITE_DB_USER,
    password: import.meta.env.VITE_DB_PASSWORD,
    database: import.meta.env.VITE_DB_DBNAME
  })

  return {
    pool
  }
}
