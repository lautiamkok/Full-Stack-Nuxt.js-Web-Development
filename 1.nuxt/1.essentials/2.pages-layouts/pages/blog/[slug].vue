<template>
  <div v-if="title || contents">
    <h2>
      {{ title }}
    </h2>
    <div v-html="contents" />
  </div>
</template>

<script setup>
const route = useRoute()
const title = ref(null)
const contents = ref(null)

// Create a dummy data of your blog.
const posts = [
  {
    slug: 'post-1',
    title: 'Post 1',
    contents: '<p>Contents 1</p>',
    layout: 'light'
  },
  {
    slug: 'post-2',
    title: 'Post 2',
    contents: '<p>Contents 2</p>',
    layout: 'dark'
  },
  {
    slug: 'post-3',
    title: 'Post 3',
    contents: '<p>Contents 3</p>'
  }
]

// Find the requested post from posts.
const found = posts.find(post => post.slug === route.params.slug)

// Throw a 400 error for invalid params.
// https://nuxt.com/docs/api/utils/create-error
const test = /^[a-zA-Z0-9\-]*$/.test(route.params.slug)
if (test === false) {
  throw createError({
    statusCode: 400, 
    statusMessage: 'Invalid request'
  })
}

// Show a 404 error if the post is not found.
// https://nuxt.com/docs/api/utils/show-error#showerror
if (found === undefined) {
  showError({ 
    statusCode: 404, 
    statusMessage: 'Page Not Found'
  })
}

// Populate the data.
title.value = found.title
contents.value = found.contents

definePageMeta({
  middleware: ['layout']
  // or middleware: 'layout'
})
</script>
