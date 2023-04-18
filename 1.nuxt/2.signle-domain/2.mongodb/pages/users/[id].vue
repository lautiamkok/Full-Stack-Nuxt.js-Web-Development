<template>
  <div v-if="!error">
    <h2>
      {{ user.name }}
    </h2>
    <p>Email:
      {{ user.email }}
    </p>
    <p>Slug:
      {{ user.slug }}
    </p>
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id
const { data: user, error } = await useFetch(`/api/users/${id}`)
</script>
