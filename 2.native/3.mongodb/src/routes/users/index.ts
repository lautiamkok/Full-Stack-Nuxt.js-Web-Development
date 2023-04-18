'use strict'

export default ctxHandler(async () => {
  const { connect, close } = useMongo()
  
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
