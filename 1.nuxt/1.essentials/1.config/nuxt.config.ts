// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  // https://nuxt.com/docs/api/nuxt-config#head
  app: {
    head: {
      title: 'Advanced Nuxt.js Web Development',
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Build SSR & SSG Vue apps with Nuxt and Composition API' },
        { name: 'keywords', content: 'Vue, Nuxt, SSR' }
      ],
      script: [
        // <script src="https://[...].js"></script>
        { 
          src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js', 
          type: 'text/javascript' 
        },

        {
          innerHTML: `
            document.addEventListener("DOMContentLoaded", function () {
              const numbers = [1, 2, 3, 4]
              const shuffle = _.shuffle(numbers)
              console.log(shuffle)
            })
          `,
          type: 'text/javascript', 
          body: true
        },
      ],
      link: [
        // <link rel="stylesheet" href="https://[...].css">
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/x-icon' }
      ],
      style: [
        // <style type="text/css">html, body { font-family: "Open Sans", sans-serif }</style>
        { children: 'html, body { font-family: "Open Sans", sans-serif }', type: 'text/css' } 
      ],
      noscript: [
        // <noscript>JavaScript is required...</noscript>
        { children: 'JavaScript is required to run this site. Please enable it on your browser.' }
      ]
    }
  },

  // https://nuxt.com/docs/api/nuxt-config#devserver
  devServer: { 
    port: 5173
  },

  // https://nuxt.com/docs/api/nuxt-config#runtimeconfig
  runtimeConfig: {
    apiKey: 'ghp_mRxDcmE0a4Pri', // Default to an empty string, automatically set at runtime using process.env.NUXT_API_KEY
    public: {
       appBaseURL: 'http://localhost:3000', // Exposed to the frontend as well.
       apiBaseURL: 'http://localhost:4000' // Exposed to the frontend as well.
    }
  },

  // https://nuxt.com/docs/api/nuxt-config#srcdir
  // srcDir: 'src/'
})
