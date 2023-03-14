<template>
  <div v-if="user">
    <h2>
      {{ user.name }}
    </h2>
    <p>Email:
      {{ user.email }}
    </p>
    <p>Created On:
      {{ useDate(user.createdAt) }}
    </p>
    <ul>
      <li>
        <NuxtLink :to="`/users/update/${user._id}`">
          Update
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="`/users/delete/${user._id}`">
          Delete
        </NuxtLink>
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
const id = route.params.id
const { data: user, error } = await useF3tch(`/users/${id}`)
</script>
