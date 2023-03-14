'use strict'

// Delete a user by id:
// $ curl -X DELETE http://localhost:5000/users/delete/{id}
export default eventHandler(async event => {
  try {
    const id = event.context.params.id

    // Connect to the db.
    const { client, db } = await connect()

    // Get the collection.
    const collectionUsers = db.collection('users')

    // Find one doc.
    const found = await collectionUsers.findOne({
      _id: new ObjectId(id)
    })
    if (!found) {
      throw createError({
        status: 404,
        statusText: `No user found`
      })
    }

    // Delete a doc.
    const doc = await collectionUsers.deleteOne({
      _id: new ObjectId(id)
    })

    // Close the db.
    close(client)

    return doc
  } catch (error) {
    throwError(error)
  }
})
