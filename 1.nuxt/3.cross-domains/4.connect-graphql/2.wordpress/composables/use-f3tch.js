// Customise the Nuxt useFetch API.
import { hash } from 'ohash'

export default (path, options) => {
  const runtimeConfig = useRuntimeConfig()

  // A unique key to ensure that data fetching can be properly de-duplicated
  // across requests, if not provided, it will be generated based on the
  // static code location.
  // https://nuxt.com/docs/api/composables/use-fetch#params
  const key = options && options.key ? {
    key: hash(Date.now())
  } : {}

  return useFetch(path, {
    // Merge objects.
    ...options,
    ...key,

    baseURL: runtimeConfig.apiBaseUrl,
    
    // Modify the Nuxt error object.
    // Nuxt uses `ofetch` internally, so use the `onResponse` interceptor 
    // from `ofetch` to transform Nuxt's error object.
    // https://github.com/unjs/ofetch
    // onResponse({ response }) {
    //   return new Promise((resolve, reject) => {
    //     response.ok ? resolve() : reject({ 
    //       status: response.status, 
    //       name: response._data.name,
    //       message: response._data.message,
    //       stack: response._data.stack,
    //       data: response._data
    //     })
    //   })
    // },

    // Or, use the `onResponseError` interceptor:
    async onResponseError({ response }) {
      return new Promise((resolve, reject) => {
        response.ok ? resolve() : reject({ 
          status: response.status || 500, 
          name: response._data.name || 'Error',
          message: response._data.message,
          stack: response._data.stack,
          data: response._data
        })
      })
    }
  })
}
