// https://nuxt.com/docs/guide/directory-structure/plugins
export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      greet: (name: string) => `Greeting, ${name}! I'm a "foo" plugin, client-server, auto-registered!`
    }
  }
})
