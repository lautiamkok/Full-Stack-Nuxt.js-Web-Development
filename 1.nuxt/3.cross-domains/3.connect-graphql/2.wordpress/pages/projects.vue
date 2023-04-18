<template>
  <div v-if="posts">
    <h1>Projects</h1>
    <ul>
      <li v-for="{ node: post } in posts" v-bind:key="post.ID">
        {{ post.post_title }}
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
    projects {
      edges {
        node {
          ID
          post_name
          post_title
        }
      }
    }
  }
`
const { data , error } = await useF3tch('/', {
  method: 'POST',
  body: { query }
})

if (data.value) {
  posts.value = data.value.projects.edges
}
</script>
