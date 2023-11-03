// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/migration/configuration#modules
  // https://windicss.org/integrations/nuxt.html
  modules: [
    'nuxt-windicss',
  ],
  // https://nuxt.com/docs/api/configuration/nuxt-config/#css
  css: [
    '@/assets/styles/css/font-face.css',
    '@/assets/styles/css/main.css',
    '@/assets/styles/less/main.less',
  ],
  // Bug fix
  // https://github.com/nuxt/nuxt/issues/21784
  experimental: {
    inlineSSRStyles: id => !id?.includes('entry')
  }
})
