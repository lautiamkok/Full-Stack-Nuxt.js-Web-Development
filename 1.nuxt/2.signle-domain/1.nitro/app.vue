<template>
  <h1>
    Nitro and Server Directory
  </h1>
  <p>
    https://nuxt.com/docs/guide/directory-structure/server
  </p>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <NuxtLink :to="item.path">
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
  <h2>
    API Routes (GET Methods)
  </h2>
  <ul v-if="apiGets">
    <li v-for="(item, index) in apiGets">
      <a :href="item.path">
        {{ item.title }}
      </a>
    </li>
  </ul>
  <h2>
    API Routes (POST Methods)
  </h2>
  <ul v-if="apiPosts">
    <li v-for="(item, index) in apiPosts">
      <h3>
        {{ item.title }}
      </h3>
      <p>Path:
        {{ item.path }}
      </p>
    </li>
  </ul>
  <NuxtPage/>
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Users',
    path: '/users'
  }
]

const apiGets = [
  {
    title: 'API',
    path: '/api'
  },
  {
    title: 'API/Users',
    path: '/api/users'
  }
]

const apiPosts = [
  {
    title: 'API/Users/Create/One',
    path: '/api/users/create/one'
  }
]
</script>
