<template>
  <site-header />
  <nav-main />
  <NuxtPage />
</template>

<script setup>
// Set a `message` state to be shared between the server and client across components.
// https://nuxt.com/docs/getting-started/state-management
const message = 'Hello World!'
useState('message', () => message)
</script>
