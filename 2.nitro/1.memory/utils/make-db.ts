'use strict'

// https://nuxt.com/docs/guide/directory-structure/server#server-utilities
export default () => {
  const name = import.meta.env.DB_DBNAME
  return useStorage(name)
}
