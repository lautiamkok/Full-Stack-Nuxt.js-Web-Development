<!--
  Option 1: Using `route.params`.
-->
<template>
  <projects-items-with-pager/>
</template>

<!--
  Option 2: Using `route.query`. But with this option, Nuxt won't generate
  static pages for the next pages. So, use this option only if you are making
  an SSR app. Don't use this if you are aiming for an SSG app (a static site).
-->
<!-- <template>
  <div v-if="data">
    <ul>
      <li v-if="data.prev_page">
        <NuxtLink :to="'/projects?page=' + data.prev_page">
          Previous
        </NuxtLink>
      </li>
      <li>
        <p v-if="data.current_page && data.total_pages">
          {{ data.current_page }} of {{ data.total_pages }}
        </p>
      </li>
      <li v-if="data.next_page">
       <NuxtLink :to="'/projects?page=' + data.next_page">
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
        <img :alt="post.post_title" :src="useAsset(post.thumbnail)" />
      </li>
    </ul>
  </div>

  <error-handler 
    v-bind:error="error" 
    v-else 
  />
</template>

<script setup>
const route = useRoute()
const number = route.params.number
const page = route.query.page

const query = reactive({
  posts_per_page: 6,
  page_number: page === undefined ? 1 : parseInt(page)
})
const { data, refresh, error } = await useF3tch('/wp-json/api/v1/projects/', {
  method: 'POST',
  body: query
})

// https://nuxt.com/docs/migration/component-options#watchquery
// https://vuejs.org/api/reactivity-core.html#watch
watch(() => route.query.page, async (newValue, oldValue) => {
  console.log('newValue =', newValue)
  console.log('oldValue =', oldValue)
  query.page_number = newValue
  refresh()
})

// Refresh the data otherwise the data on the next pages stay the same.
// https://nuxt.com/docs/getting-started/data-fetching#refreshing-data
refresh()
</script> -->
