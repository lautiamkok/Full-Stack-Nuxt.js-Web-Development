'use strict'

import mariadb from 'mariadb'

// Use a pooling connection for all MySQL query. A pool is a place where
// connections get stored. When you request a connection from a pool, you are
// either given a connection that is currently not being used or a new
// connection. If you’re at the connection limit, it will wait until a
// connection is available before it continues.
// https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/
// https://en.wikipedia.org/wiki/Connection_pool
const pool = mariadb.createPool({
  connectionLimit: 10,
  host: import.meta.env.VITE_DB_HOST,
  user: import.meta.env.VITE_DB_USER,
  password: import.meta.env.VITE_DB_PASSWORD,
  database: import.meta.env.VITE_DB_DBNAME
})

export default async () => {
  let connection
  try {
    connection = await pool.getConnection()
  } catch (err) {
    throw err
  } 

  return {
    pool: connection
  }
}
