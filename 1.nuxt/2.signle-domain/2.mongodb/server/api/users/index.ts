'use strict'

export default eventHandler(async () => {
  // Connect to the db.
  const { client, db } = await connect()

  // Get the collection.
  const collectionUsers = db.collection('users')

  // Find all docs.
  const docs = await collectionUsers.find().toArray()

  // Close the db.
  close(client)

  return docs
})

// import { MongoClient } from 'mongodb'

// export default eventHandler(async event => {
//   const client = await new MongoClient('mongodb://localhost:27017').connect()
//   const collection = client.db('advanced-nuxtjs-course').collection('users')
//   const docs = await collection.find().toArray()
//   client.close()
//   return docs
// })
