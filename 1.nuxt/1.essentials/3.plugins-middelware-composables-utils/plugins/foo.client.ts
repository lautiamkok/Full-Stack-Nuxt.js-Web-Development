// https://nuxt.com/docs/guide/directory-structure/plugins If you want to make a
export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      hi: (name: string) => `Hi, ${name}! I'm a "foo" plugin, client-only, auto-registered!`
    }
  }
})
