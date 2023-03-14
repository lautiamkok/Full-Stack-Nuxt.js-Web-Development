<template>
  <div v-if="users">
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" v-bind:key="user._id">
        {{ user.name }}
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
const runtimeConfig = useRuntimeConfig()
const users = ref()
const query = `
  query {
    users {
      _id
      name
      slug
      email
      createdAt
    }
  }
`
const { data , error } = await useF3tch('/', {
  method: 'POST',

  // No need to use JSON.stringify to stringify user reactive object if using
  // `ofetch`.
  body: { query }
})

if (data.value) {
  users.value = data.value.data.users
}
</script>
