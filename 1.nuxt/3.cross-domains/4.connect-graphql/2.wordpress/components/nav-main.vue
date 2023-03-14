<template>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <NuxtLink :to="item.path">
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Projects',
    path: '/projects'
  }
]
</script>
