'use strict'

// https://redis.io/docs/clients/nodejs/
import { createClient } from 'redis'

// https://nitro.unjs.io/guide/introduction/routing#specific-request-method
// https://nuxt.com/docs/guide/directory-structure/server#matching-http-method
// https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
export default eventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const cartId = runtimeConfig.public['appCartId']

  // Get the value of the cart from cookie and use it to set a key in Redis
  // db, e.g. `example.com:cart:1683665729834`.
  // const cookie = event.req.headers.cookie
  // console.log('cookie =', cookie)

  // Use the `getCookie` API from h3 to retrieve your cookie in the headers.
  // https://nuxt.com/docs/api/composables/use-cookie#handling-cookies-in-api-routes
  const value = getCookie(event, cartId) || null
  const key = value ? `${cartId}:${value}` : null

  // Stop right here if no key.
  if (!key) {
    return null
  }

  const body = await readBody(event)

  const client = createClient()
  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  // Expire in [x] days.
  // const days = 30
  // const expire = days * 24 * 60 * 60
  
  // Expire in [x] minutes.
  const expire = 5 * 60

  // Sets a time-to-live (TTL) of one minute for the cached data,
  // after which it will expire and the next request will have to
  // set the data again.
  // EX seconds -- Set the specified expire time, in seconds.
  // https://redis.io/commands/set/
  return await client.set(key, JSON.stringify(body), { 'EX': expire })
})
