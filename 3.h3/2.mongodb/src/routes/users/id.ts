'use strict'

// Get the user by id.
export default eventHandler(async event => {
  try {
    const id = event.context.params.id

    // Connect to the db.
    const { client, db } = await connect()

    // Get the collection.
    const collectionUsers = db.collection('users')

    // https://www.mongodb.com/docs/v6.0/reference/method/ObjectId/
    const _id = new ObjectId(id)

    // Find one doc.
    const doc = await collectionUsers.findOne({
      _id
    })

    // Close the db.
    close(client)

    return doc
  } catch (error) {
    throwError(error)
  }
})
