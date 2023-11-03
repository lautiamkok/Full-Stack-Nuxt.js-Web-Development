<template>
  <!--
    Set a top-level layout here.
    https://nuxt.com/docs/guide/directory-structure/layouts#layouts-directory
  -->
  <NuxtLayout>
    <h1>
      Layouts and Pages
    </h1>
    <ul v-if="menu">
      <li v-for="(item, index) in menu">
        <NuxtLink :to="item.path">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'About',
    path: '/about'
  },
  {
    title: 'Blog',
    path: '/blog'
  },
  {
    title: 'Shop (Per-page Layout)',
    path: '/shop'
  },
  {
    title: 'Contact (404 error demo)',
    path: '/contact'
  }
] 

// Handle errors that come from anywhere in the app, such as the error occurs in
// `pages`, `components`, and `composables` directories, etc, that are not
// caught in the `try-catch` block.
onErrorCaptured(err => {
  // Catch the error and send it to the `error.vue` page.
  // https://nuxt.com/docs/api/utils/show-error#showerror
  showError({ 
    statusCode: err.statusCode || 500, 
    statusMessage: `${err.name} - ${err.message}`,
    stack: err.stack
  })

  // Return false to prevent the error from propagating further.
  return false
})
</script>
