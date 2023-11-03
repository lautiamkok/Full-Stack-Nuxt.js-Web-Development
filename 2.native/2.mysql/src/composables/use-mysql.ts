'use strict'

import util from 'util'
import mysql from 'mysql'

// Rather than creating and managing connections one-by-one, this module also
// provides built-in connection pooling using mysql.createPool
// (config). 
// https://www.npmjs.com/package/mysql#pooling-connections
const pool = mysql.createPool({
  connectionLimit: 10,
  host: import.meta.env.VITE_DB_HOST,
  user: import.meta.env.VITE_DB_USER,
  password: import.meta.env.VITE_DB_PASSWORD,
  database: import.meta.env.VITE_DB_DBNAME
})

export default () => {
  // Ping database to check for common exception errors.
  pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
    }

    if (connection) {
      connection.release()
    }
  })

  // Refactoring MySQL to Node.js 8’s Async/Await/ Promisify for Node.js async/await.
  // MySQL npm package does not support async/await, Node.js has a solution for
  // such case. Its included promisify utility is coming to the rescue.

  // pool.query() is a shortcut for pool.getConnection() + connection.query() + connection.release().
  pool.query = util.promisify(pool.query)

  return {
    pool
  }
}
