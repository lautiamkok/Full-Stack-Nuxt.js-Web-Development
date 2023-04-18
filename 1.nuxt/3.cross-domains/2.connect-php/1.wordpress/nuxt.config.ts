// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      appBaseUrl: process.env.APP_BASE_URL,
      apiBaseUrl: process.env.API_BASE_URL
    }
  }
})
