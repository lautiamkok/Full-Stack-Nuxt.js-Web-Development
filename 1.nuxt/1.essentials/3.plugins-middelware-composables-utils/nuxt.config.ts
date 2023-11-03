// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },

  // Manually register un-scanned plugins - plugins that are stored in sub-directories.
  // https://nuxt.com/docs/api/configuration/nuxt-config/#plugins-1
  plugins: [
    '~/plugins/fooz/fooz-1.ts', // both client & server
    // { src: '~/plugins/fooz/fooz-1.ts' }, // both client & server
    // { src: '~/plugins/fooz/fooz-1.ts', mode: 'client' }, // only on client side
    // { src: '~/plugins/fooz/fooz-1.ts', mode: 'server' } // only on server side
  ],

  // By default, Nuxt only scans files at the top level of `/composables/`, so
  // configure it to scan the sub-directories here.
  // https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned
  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**'
    ]
  }
})
