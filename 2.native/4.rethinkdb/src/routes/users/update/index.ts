'use strict'

import rdb from 'rethinkdb'

// Update a user by id:
// $ curl -X PUT http://localhost:5000/users/update/[id] \
//  -H "Content-Type: application/json" \
//  -d '{"name": "Johnny", "slug": "john"}'
export default ctxHandler(async ctx => {
  const { connect } = useRethink()
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

  // Get the db connection.
  const db = await connect()

  // Throw the error if the table does not exist.
  const exists = await rdb.tableList().contains('users').run(db)
  if (exists === false) {
    createError({
      statusCode: 500,
      message: '"users" table does not exist'
    })
  }

  // Find one doc except itself.
  // https://rethinkdb.com/api/javascript/filter
  // https://rethinkdb.com/api/javascript/ne
  const found = await rdb.table('users')
    .filter(
      rdb.row('slug').eq(body.slug) // equal
    )
    .filter(
      rdb.row('id').ne(id) // but not equal itself
    )
    .nth(0) // query for a stream/array element by its position
    .default(null) // will return null if no user found.
    .run(db)
  if (found) {
    createError({
      statusCode: 400,
      message: `slug "${body.slug}" has been taken`
    })
  }

  // Get the current doc.
  const currentDocument = await rdb.table('users')
    .get(id)
    .run(db)

  // Prepare the update query.
  const timestamp = Date.now()
  const updateQuery = {
    name: body.name,
    slug: body.slug,
    updatedAt: timestamp
  }

  // Merge two objects.
  const options = { ...currentDocument, ...updateQuery }

  // Update document by id.
  // https://rethinkdb.com/api/javascript/update/
  const doc = await rdb.table('users')
    .get(id)
    .update(options, { returnChanges: true })
    .run(db)

  // Close the db connection.
  db.close()

  if (doc.replaced !== 1) {
    createError({
      statusCode: 500,
      message: `Update user failed`
    })
  }

  return doc
})
