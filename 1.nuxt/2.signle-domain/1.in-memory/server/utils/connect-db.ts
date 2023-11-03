'use strict'

// https://nuxt.com/docs/guide/directory-structure/server#server-utilities
export default () => {
  // Specify a base from .env.
  const base = import.meta.env.NITRO_DB_DBNAME

  // Use useStorage to keep data in memory. useStorage an instance of
  // createStorage using the memory driver. 
  // https://nitro.unjs.io/guide/storage
  // https://unstorage.unjs.io/drivers/memory
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  return useStorage(base)
}
