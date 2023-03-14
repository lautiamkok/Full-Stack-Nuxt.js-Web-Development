'use strict'

import { connect, close, ObjectId } from '@/utils/mongo'

export async function getItem (collectionName, root, args) {
  // Connect to the db.
  const { client, db } = await connect()

  // Get the collection.
  const collection = db.collection(collectionName)

  // Find one doc.
  const result = await collection.findOne({
    $or: [
      { slug: args.slug },
      { _id: ObjectId(args._id) }
    ]
  })

  // Close the connection.
  close(client)

  return result
}

export async function getItems (collectionName, root, args) {
  // Set default limit and skip if not provided.
  const limit = args.limit ? args.limit : 12
  const skip = args.skip ? args.skip : 0

  // Connect to the db.
  const { client, db } = await connect()

  // Get the collection.
  const collection = db.collection(collectionName)

  let query = {}

  // Find all docs from the collection.
  const docs = await collection.find(query)
    .limit(limit)
    .skip(skip)
    .toArray()

  // Close the connection.
  close(client)

  return docs
}

export async function countItems (collectionName, root, args) {
  // Connect to the db.
  const { client, db } = await connect()

  // Get the collection.
  const collection = db.collection(collectionName)

  let query = {}

  // Count total docs.
  // https://www.mongodb.com/docs/manual/reference/method/db.collection.countDocuments
  const total = await collection.countDocuments(query)

  // Close the connection.
  close(client)

  return total
}
