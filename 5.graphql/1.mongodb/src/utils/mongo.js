'use strict'

// https://www.npmjs.com/package/mongodb
// https://stackoverflow.com/questions/70819695/mongodb-express-cannot-use-a-session-that-has-ended
import { MongoClient, ObjectId } from 'mongodb'

// Connection URL.
const url = import.meta.env.VITE_DB_HOST

// Database Name.
const dbName = import.meta.env.VITE_DB_DBNAME

async function connect () {
  const client = new MongoClient(url)

  await client.connect()
  console.log('🚀 Connected successfully to MongoDB server')

  const db = client.db(dbName)

  return { client, db }
}

function close (client) {
  // Close the connection.
  client.close()
  console.log('🚀 Disconnected from MongoDB server')
}

export {
  ObjectId,
  connect,
  close
}
