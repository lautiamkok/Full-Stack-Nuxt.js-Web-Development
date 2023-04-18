<template>
  <error-boundary v-bind:error="error">
    <h2>
      Users
    </h2>
    <ul>
      <li v-for="user in users" v-bind:key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </error-boundary>
</template>

<script setup>
const { data: users, error } = await useF3tch('/users')
</script>
