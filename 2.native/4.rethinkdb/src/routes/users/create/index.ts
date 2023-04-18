'use strict'

import rdb from 'rethinkdb'

// Use Node.js built-in `crypto` to generate UUIDs.
import crypto from 'crypto'

// Add a user:
// $ curl -X POST http://localhost:5000/users/create \
//  -H "Content-Type: application/json" \
//  -d '{"name": "John", "slug": "john"}'
export default ctxHandler(async ctx => {
  const { connect } = useRethink()
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

  // Get the db connection.
  const db = await connect()

  // Throw the error if the table does not exist.
  const exists = await rdb.tableList().contains('users').run(db)
  if (exists === false) {
    createError({
      statusCode: 500,
      message: `"users" table does not exist`
    })
  }

  // Check if the provided slug is taken.
  const searchQuery = {
    slug: body.slug
  }
  const found = await rdb.table('users')
    .filter(searchQuery)
    .nth(0) // query for a stream/array element by its position
    .default(null) // will return null if no user found.
    .run(db)

  if (found) {
    createError({
      statusCode: 400,
      message: `slug "${body.slug}" has been taken`
    })
  }

  // Current timestamp.
  const timestamp = Date.now()
  const options = {
    name: body.name,
    slug: body.slug,
    createdAt: timestamp
  }

  // Insert a doc.
  // https://rethinkdb.com/api/javascript/insert
  const doc = await rdb.table('users')
    .insert(options, { returnChanges: true })
    .run(db)

  // Close the db connection.
  db.close()

  if (doc.inserted !== 1) {
    createError({
      statusCode: 500,
      message: `Add user failed`
    })
  }

  return doc
})
