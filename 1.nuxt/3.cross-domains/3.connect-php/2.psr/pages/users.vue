<template>
  <div v-if="users">
    <h2>
      Users
    </h2>
    <ul>
      <li v-for="user in users" v-bind:key="user.uuid">
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
const { data: users , error } = await useF3tch('/users')
</script>
