<template>
  <h1>
    {{ data.title }}
  </h1>
  <ul v-if="data.carousel">
    <li v-for="image in data.carousel">
      <nuxt-link :to="image.link">
        <img 
          :src="useAsset(image.filename)" 
          :title="image.title"
        />
      </nuxt-link>
    </li>
  </ul>
  <ContentRenderer :value="data" />
</template>

<script setup>
const { data } = await useAsyncData('home', () => queryContent('/').findOne())
</script>
