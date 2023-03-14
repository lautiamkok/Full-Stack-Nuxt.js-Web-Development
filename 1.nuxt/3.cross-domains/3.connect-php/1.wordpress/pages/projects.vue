<template>
  <div v-if="!error">
    <h2 v-if="!route.params.slug">
      Projects
    </h2>
    <NuxtPage :page-key="route.path" />
  </div>
  <error-handler 
    v-else 
    v-bind:error="error" 
  />
</template>

<script setup>
const route = useRoute()
const { data: post, error } = await useF3tch(`/wp-json/api/v1/page/projects`)

if (post.value) {
  const head = unref(post).head

  // Override the default head meta.
  useHead({
    title: head.title,
    meta: [
      {
        name: 'description',
        content: head.description
      },
      {
        property: 'og:title',
        content: head.og.title
      },
      {
        property: 'og:description',
        content: head.og.description
      },
      {
        property: 'og:image',
        content: head.og.image
      },
      {
        name: 'twitter:description',
        content: head.og.description
      },
    ],
  })
}
</script>
