'use strict'

// Update a user by id:
// $ curl -X PUT http://localhost:5000/users/update/[id] \
//  -H "Content-Type: application/json" \
//  -d '{"name": "Johnny", "slug": "john"}'
export default ctxHandler(async ctx => {
  const { connect, close, ObjectId } = useMongo()
  const id = ctx.params.id
  const body = await normalizeBody(ctx.req)

  if (body.name === undefined) {
    // Create the error and throw it.
    createError({
      statusCode: 500,
      message: 'name is undefined'
    })
  }

  if (body.slug === undefined) {
    createError({
      statusCode: 500,
      message: 'slug is undefined'
    })
  }

  if (body.name === '') {
    createError({
      statusCode: 400,
      message: 'name is required'
    })
  }

  if (body.slug === '') {
    createError({
      statusCode: 400,
      message: `slug is required`
    })
  }

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

  // Find one doc except itself.
  const taken = await collectionUsers.findOne({
    slug: body.slug,
    // https://docs.mongodb.com/manual/reference/operator/query/ne/#op._S_ne
    _id: { $ne: new ObjectId(id) }
  })
  if (taken) {
    createError({
      statusCode: 400,
      message: `slug "${body.slug}" has been taken`
    })
  }

  // Update a doc.
  const doc = await collectionUsers.updateOne({
    _id: new ObjectId(id)
  }, {
    $set: { 
      name: body.name, 
      slug: body.slug, 
      email: body.email 
    },
    $currentDate: { lastModified: true }
  })

  // Close the db.
  close(client)

  return doc
})
