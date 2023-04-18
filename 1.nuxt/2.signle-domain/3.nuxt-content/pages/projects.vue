<template>
  <h2 v-if="!route.params.slug">
    Projects
  </h2>
  <NuxtPage :page-key="route.path" />
</template>

<script setup>
const route = useRoute()
</script>
