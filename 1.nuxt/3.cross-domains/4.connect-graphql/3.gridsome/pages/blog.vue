<template>
  <div v-if="posts">
    <h2>
      Blog
    </h2>
    <ul>
      <li v-for="{ node: post } in posts" v-bind:key="post.id">
        <h3>
          {{ post.title }}
        </h3>
        <img 
          :alt="post.thumbnail.title" 
          :src="useAsset(post.thumbnail.filename, '/images/')" 
        />
      </li>
    </ul>
  </div>

  <!-- Use `showError` on the `error-handler` page -->
  <error-handler 
    v-bind:error="error" 
    v-else 
  />
</template>

<script setup>
const posts = ref()
const query = `
  query {
    allPost {
      edges {
        node {
          id
          path
          title
          thumbnail {
            title
            filename
          }
        }
      }
    }
  }
`
const { data , error } = await useF3tch('/___graphql', {
  method: 'POST',
  body: { query }
})

if (data.value) {
  posts.value = data.value.data.allPost.edges
}
</script>
