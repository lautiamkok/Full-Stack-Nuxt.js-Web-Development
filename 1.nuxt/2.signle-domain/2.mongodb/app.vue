<template>
  <h1>
    Nuxt + MongoDB
  </h1>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <NuxtLink :to="item.path">
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
  <NuxtPage/>
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Users',
    path: '/users'
  }
]
</script>
