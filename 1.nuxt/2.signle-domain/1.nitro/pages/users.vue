<template>
  <div v-if="!error">
    <h2>
      Users
    </h2>
    <ul v-if="users.length > 0">
      <li v-for="user in users">
        <h3>
          {{ user.name }}
        </h3>
        <p>
          slug:
          {{ user.slug }}
        </p>
      </li>
    </ul>
    <p v-else>
      No user found.
    </p>
  </div>
</template>

<script setup>
const { data: users, error } = await useFetch('/api/users')
</script>

