<template>
  <div v-if="!error">
    <site-header/>
    <nav-main/>
    <NuxtPage/>
  </div>
  <error-handler 
    v-else 
    v-bind:error="error" 
  />
</template>

<script setup>
const { data, error } = await useF3tch(`/wp-json/api/v1/siteinfo`)

// Make sure no error before continuing.
if (!error.value) {
  const siteinfo = unref(data)
  siteinfo.url = import.meta.env.VITE_APP_BASE_URL

  // Store the siteinfo globally.
  useState('siteinfo', () => siteinfo)

  // Set default head.
  // https://nuxt.com/docs/getting-started/seo-meta
  useHead({
    title: '',
    meta: [
      {
        name: 'description',
        content: siteinfo.description
      },
      {
        property: 'og:type',
        content: siteinfo.open_graph.og_type
      },
      {
        property: 'og:url',
        content: siteinfo.url
      },
      {
        property: 'og:title',
        content: siteinfo.title
      },
      {
        property: 'og:description',
        content: siteinfo.description
      },
      {
        property: 'og:image',
        content: siteinfo.open_graph.og_image
      },
      {
        property: 'og:image:width',
        content: siteinfo.open_graph.og_image_width
      },
      {
        property: 'og:image:height',
        content: siteinfo.open_graph.og_image_height
      },
      {
        property: 'fb:app_id',
        content: siteinfo.open_graph.fb_app_id
      },
      {
        name: 'twitter:site',
        content: siteinfo.open_graph.twitter_site
      },
      {
        name: 'twitter:creator',
        content: siteinfo.open_graph.twitter_creator
      },
      {
        name: 'twitter:card',
        content: siteinfo.open_graph.twitter_card
      },
      {
        name: 'twitter:description',
        content: siteinfo.description
      },
    ],
  })
}

// Handle errors that come from anywhere in the app that are not caught in the
// `try-catch` block.
onErrorCaptured(err => {
  showError({ 
    statusCode: err.statusCode || 500, 
    statusMessage: `${err.name} - ${err.message}`,
    stack: err.stack
  })
  return false
})
</script>
