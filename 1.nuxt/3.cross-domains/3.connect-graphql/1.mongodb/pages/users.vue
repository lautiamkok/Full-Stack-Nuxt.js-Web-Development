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
  body: { query }
})

if (data.value) {
  // No need to do `data.value.data.users` because it is done in `useF3tch` by
  // intercepting the response data. 
  // users.value = data.value.data.users
  users.value = data.value.users
}
</script>
