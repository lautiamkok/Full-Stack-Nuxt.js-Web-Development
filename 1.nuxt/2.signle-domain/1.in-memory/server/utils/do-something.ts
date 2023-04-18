'use strict'

// https://nuxt.com/docs/guide/directory-structure/server#server-utilities
// Usage:
// doSomething()
export default async () => {
  return import.meta.env.NITRO_DB_DBNAME
}
