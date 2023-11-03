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
