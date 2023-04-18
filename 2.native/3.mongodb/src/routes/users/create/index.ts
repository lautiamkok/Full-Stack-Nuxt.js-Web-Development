'use strict'

// Use Node.js built-in `crypto` to generate UUIDs.
import crypto from 'crypto'

// Add a user:
// $ curl -X POST http://localhost:5000/users/create \
//  -H "Content-Type: application/json" \
//  -d '{"name": "John", "slug": "john"}'
export default ctxHandler(async ctx => {
  const { connect, close } = useMongo()
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
    slug: body.slug
  })
  if (found) {
    createError({
      statusCode: 400,
      message: `slug "${body.slug}" has been taken`
    })
  }

  // Current timestamp.
  const timestamp = Date.now()

  // Insert a doc.
  const doc = await collectionUsers.insertOne({
    name: body.name,
    slug: body.slug,
    // username: body.username,
    // password: body.password,
    email: body.email,
    createdAt: timestamp
  })

  // Close the db.
  close(client)

  return doc
})
