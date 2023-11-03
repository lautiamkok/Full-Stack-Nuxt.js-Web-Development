<template>
  <!-- 
    Set a per-page layout here and change within this component (page) only
  -->
  <NuxtLayout :name="layout">
    <h2>
      {{ title }}
    </h2>
    <div v-html="contents" />
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const product = reactive({
  title: null,
  contents: null,
  layout: null
})
let { title, contents, layout } = toRefs(product)

// Create a dummy data of your shop.
const posts = [
  {
    slug: 'product-1',
    title: 'Product 1',
    contents: '<p>Contents 1</p>',
    layout: 'light'
  },
  {
    slug: 'product-2',
    title: 'Product 2',
    contents: '<p>Contents 2</p>',
    layout: 'dark'
  },
  {
    slug: 'product-3',
    title: 'Product 3',
    contents: '<p>Contents 3</p>'
  }
]

// Find the requested product from products.
const found = posts.find(post => post.slug === route.params.slug)

// Populate the data.
title = found.title
contents = found.contents

// Change the per-page layout in this component only.
// https://nuxt.com/docs/guide/directory-structure/layouts#overriding-a-layout-on-a-per-page-basis
layout = found.layout
</script>
