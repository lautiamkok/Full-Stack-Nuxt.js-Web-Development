// https://nuxt.com/docs/guide/directory-structure/plugins
export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      hello: (name: string) => `Hello, ${name}! I'm a "foo" plugin, server-only, auto-registered!`
    }
  }
})
