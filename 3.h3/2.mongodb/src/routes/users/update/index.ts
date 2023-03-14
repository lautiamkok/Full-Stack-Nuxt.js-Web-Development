'use strict'

// Update a user by id:
// $ curl -d "name=Johnny&slug=john" -X PUT http://localhost:5000/users/update/{id}
export default eventHandler(async event => {
  try {
    const id = event.context.params.id
    const body = await readBody(event)

    if (body.name === undefined) {
      // Create the error and throw it.
      // https://www.jsdocs.io/package/h3#createError
      // https://nuxt.com/docs/api/utils/create-error#createerror
      throw createError({
        status: 500,
        statusText: 'name is undefined'
      })
    }

    if (body.slug === undefined) {
      throw createError({
        status: 500,
        statusText: 'slug is undefined'
      })
    }

    if (body.name === '') {
      throw createError({
        status: 400,
        statusText: 'name is required'
      })
    }

    if (body.slug === '') {
      throw createError({
        status: 400,
        statusText: `slug is required`
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
      throw createError({
        status: 404,
        statusText: `No user found`
      })
    }

    // Find one doc except itself.
    const taken = await collectionUsers.findOne({
      slug: body.slug,
      // https://docs.mongodb.com/manual/reference/operator/query/ne/#op._S_ne
      _id: { $ne: new ObjectId(id) }
    })
    if (taken) {
      throw createError({
        status: 400,
        statusText: `slug "${body.slug}" has been taken`
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
  } catch (error) {
    throwError(error)
  }
})
