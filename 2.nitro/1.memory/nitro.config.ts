// https://nitro.unjs.io/guide/introduction/configuration
import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  // Serve assets from a custom directory.
  // https://nitro.unjs.io/guide/assets#custom-server-assets
  serverAssets: [{
    // baseName: 'my_directory',
    // dir: './server/my_directory'
  }]
})
