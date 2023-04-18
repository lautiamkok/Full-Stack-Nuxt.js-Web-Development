// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      appBaseUrl: process.env.APP_BASE_URL,
      appCartId: process.env.APP_CART_ID
    }
  },
  modules: [
    '@pinia/nuxt'
  ]
})
