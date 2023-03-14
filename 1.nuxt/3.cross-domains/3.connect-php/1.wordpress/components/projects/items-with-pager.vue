<template>
  <div v-if="data">
    <ul>
      <li v-if="data.prev_page">
        <NuxtLink :to="'/projects/pages/' + data.prev_page">
          Previous
        </NuxtLink>
      </li>
      <li>
        <p v-if="data.current_page && data.total_pages">
          {{ data.current_page }} of {{ data.total_pages }}
        </p>
      </li>
      <li v-if="data.next_page">
        <NuxtLink :to="'/projects/pages/' + data.next_page">
          Next
        </NuxtLink>
      </li>
    </ul>
    <ul>
      <li v-for="post in data.items" :key="post.ID">
        <h3>
          <NuxtLink :to="`/projects/${post.post_name}`">
            {{ post.post_title }}
          </NuxtLink>
        </h3>
        <div
          v-html="post.excerpt"
        />
        <img 
          :alt="post.post_title" 
          :src="useAsset(post.thumbnail)" 
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
const route = useRoute()
const number = route.params.number
const query = {
  posts_per_page: 6,
  page_number: number === undefined ? 1 : parseInt(number)
}
const { data, refresh, error } = await useF3tch('/wp-json/api/v1/projects/', {
  method: 'POST',
  body: query
})

// Refresh the data otherwise the data on the next pages stay the same.
// https://nuxt.com/docs/getting-started/data-fetching#refreshing-data
refresh()
</script>
