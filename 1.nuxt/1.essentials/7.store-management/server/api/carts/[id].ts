'use strict'

// https://redis.io/docs/clients/nodejs/
import { createClient } from 'redis'

export default eventHandler(async event => {
  const id = event.context.params.id

  // Stop right here if no id.
  if (!id) {
    return null
  }

  const client = createClient()
  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  const data = JSON.parse(await client.get(id))
  client.quit()

  return data
})
