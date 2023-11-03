<template>
  <h1 class="text-2xl font-bold">
    Tailwind CSS, Less, Asset Serving  
  </h1>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <NuxtLink :to="item.path" class="underline">
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
    title: 'Responsive Layouts',
    path: 'responsive'
  },
  {
    title: 'Assets',
    path: 'assets'
  },
]
</script>
