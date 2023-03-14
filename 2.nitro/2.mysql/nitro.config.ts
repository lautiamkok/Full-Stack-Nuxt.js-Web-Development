// https://nitro.unjs.io/guide/introduction/configuration
import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  // Replace nitro's built-in error page.
  // https://nitro.unjs.io/config#errorhandler
  errorHandler: '~/error'
})
