<template>
  <ul v-if="blog">
    <li v-for="post in blog" :key="post._path">
      <h3>
        <NuxtLink :to="post._path">
          {{ post.title }}
        </NuxtLink>
      </h3>
      <NuxtLink :to="post._path">
        <img 
          :alt="post.thumbnail.title" 
          :src="useAsset(post.thumbnail.filename)" 
        />
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
// https://content.nuxtjs.org/api/composables/query-content
// https://content.nuxtjs.org/api/composables/query-content#onlykeys
// https://content.nuxtjs.org/api/composables/query-content#find
const blog = await queryContent('blog')
  .only(['_path', 'title', 'thumbnail'])
  .find()
</script>

