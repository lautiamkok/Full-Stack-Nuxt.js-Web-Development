<template>
  <site-header />
  <nav-main />
  <NuxtPage />
</template>

<script setup>
const countB = ref(0)
provide('count', countB)

// Set a `counter` state to be shared between the server and client across components.
// https://nuxt.com/docs/getting-started/state-management
const countC = useState('count', () => 0)
</script>
