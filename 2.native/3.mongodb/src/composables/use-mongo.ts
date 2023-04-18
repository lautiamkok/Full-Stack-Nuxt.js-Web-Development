'use strict'

// https://www.npmjs.com/package/mongodb
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

export default () => {
  return {
    ObjectId,
    connect,
    close
  }
}

