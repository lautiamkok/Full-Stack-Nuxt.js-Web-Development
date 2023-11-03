<template>
  <h1>
    Plugins, Middleware, Composables, and Utils
  </h1>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <NuxtLink :to="item.path">
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
  <NuxtPage />
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Plugins',
    path: '/plugins'
  },
  {
    title: 'Middleware',
    path: '/middleware'
  },
  {
    title: 'Composables',
    path: '/composables'
  },
  {
    title: 'Utils',
    path: '/utils'
  }
]
</script>
