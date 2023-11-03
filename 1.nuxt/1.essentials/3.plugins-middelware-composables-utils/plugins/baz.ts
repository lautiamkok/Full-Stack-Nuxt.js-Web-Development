// https://nuxt.com/docs/guide/directory-structure/plugins
export default defineNuxtPlugin(nuxtApp => {
  // Plugins can access the data from Nuxt config file.
  const runtimeConfig = useRuntimeConfig()
  const apiBaseUrl = runtimeConfig.public['apiBaseUrl']
  
  // You can use composables within Nuxt plugins.
  // https://nuxt.com/docs/guide/directory-structure/plugins#using-composables-within-plugins
  const foo = useFoo()

  // Option 1:
  // nuxtApp.provide('apiBaseUrl', apiBaseUrl)
  // Option 2:
  return {
    provide: {
      apiBaseUrl,
      foo
    }
  }
})
