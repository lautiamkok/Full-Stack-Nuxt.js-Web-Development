<template>
  <error-boundary v-bind:error="error">
    <h2>
      Users
    </h2>
    <ul>
      <li v-for="user in users" v-bind:key="user._id">
        <NuxtLink :to="`/users/${user._id}`">
          {{ user.name }}
        </NuxtLink>
        <NuxtLink :to="`/users/update/${user._id}`">
          [Update]
        </NuxtLink>
        <NuxtLink :to="`/users/delete/${user._id}`">
          [Delete]
        </NuxtLink>
      </li>
    </ul>
    <NuxtLink to="/users/create">
      Add New
    </NuxtLink>
  </error-boundary>
</template>

<script setup>
const { data: users, error } = await useF3tch('/users')

if (unref(error) !== null) {
  // Show a full screen error page on the `error.vue` page.
  // https://nuxt.com/docs/api/utils/show-error
  showError({ 
    statusCode: error.value.statusCode || 500, 
    statusMessage: error.value.message
  })
}
</script>
