'use strict'

// https://nuxt.com/docs/guide/directory-structure/server#server-plugins
// https://nitro.unjs.io/guide/plugins
export default defineNitroPlugin((nitroApp) => {
  console.log('Nitro plugin runs when server is started: ', nitroApp)
})
