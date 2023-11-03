<template>
  <p>
    Hello World!
  </p>
</template>

<script setup>
const { data: post } = await useF3tch(`/wp-json/api/v1/page/home`)

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
        name: 'keywords',
        content: head.keywords
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
