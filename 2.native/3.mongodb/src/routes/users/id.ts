'use strict'

// Get the user by id.
export default ctxHandler(async ctx => {
  const { connect, close, ObjectId } = useMongo()
  const id = ctx.params.id

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

  if (!doc) {
    createError({
      statusCode: 404,
      message: `user with id of "${ctx.params.id}" not found`
    })
  }

  return doc
})
