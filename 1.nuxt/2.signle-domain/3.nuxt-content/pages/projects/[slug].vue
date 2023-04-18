<template>
  <div v-if="post">
    <h2>
      {{ post.title }}
    </h2>
    <ContentRenderer :value="post" />
    <ul>
      <li v-for="image in post.carousel">
        <img 
          :alt="image.title" 
          :src="useAsset(image.filename)"
        />
      </li>
    </ul>
    <ul>
      <li v-for="image in post.attachments">
        <img 
          :alt="image.title" 
          :src="useAsset(image.filename)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
const { path } = useRoute()
const { data: post } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})
</script>
