<template>
  <p v-if="!error">
    {{ data.message }}
  </p>
</template>

<script setup>
// Fetch the data using the `useFetch` method provided by Nuxt.
// https://nuxt.com/docs/api/composables/use-fetch
const { data, error } = await useFetch('/api')
</script>

