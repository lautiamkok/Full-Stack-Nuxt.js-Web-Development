'use strict'

// Delete a user by id:
// $ curl -X DELETE http://localhost:5000/users/delete/64395e2192f43f9e8221932c
export default ctxHandler(async ctx => {
  const { connect, close, ObjectId } = useMongo()
  const id = ctx.params.id

  // Connect to the db.
  const { client, db } = await connect()

  // Get the collection.
  const collectionUsers = db.collection('users')

  // Find one doc.
  const found = await collectionUsers.findOne({
    _id: new ObjectId(id)
  })
  if (!found) {
    createError({
      statusCode: 404,
      message: `No user found`
    })
  }

  // Delete a doc.
  const doc = await collectionUsers.deleteOne({
    _id: new ObjectId(id)
  })

  // Close the db.
  close(client)

  return doc
})
