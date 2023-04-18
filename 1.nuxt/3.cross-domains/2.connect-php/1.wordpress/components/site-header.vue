<template>
  <h1>
    {{ title }}
  </h1>
  <p>
    Nuxt -> WordPress
  </p>
</template>

<script setup>
const title = ref('Nuxt and WordPress')
const siteinfo = useState('siteinfo')
if (siteinfo.value) {
  title.value = siteinfo.value.title
}
</script>
