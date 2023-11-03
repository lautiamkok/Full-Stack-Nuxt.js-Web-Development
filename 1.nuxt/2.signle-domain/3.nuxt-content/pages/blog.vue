<template>
  <h2 v-if="!route.params.slug">
    Blog
  </h2>
  <NuxtPage />
</template>

<script setup>
const route = useRoute()
</script>
