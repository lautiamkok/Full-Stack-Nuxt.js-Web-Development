<template>
  <h2>
    Create User
  </h2>

  <form>
    <p>Slug: 
      <input v-model="user.slug" type="text" name="slug">
    </p>
    <p>Name: 
      <input v-model="user.name" type="text" name="name">
    </p>
    <p>Email: 
      <input v-model="user.email" type="text" name="email">
    </p>
  </form>

  <ul>
    <li>
      <button v-on:click="cancel">
        Cancel
      </button>
    </li>
    <li>
      <button v-on:click="create">
        Create
      </button>
    </li>
  </ul>

  <p style="color: red;" v-if="response.status && response.status != 200">
    {{ response.message }}
  </p>
</template>

<script setup>
const router = useRouter()
const user = reactive({
  name: '',
  slug: '',
  email: ''
})
const response = reactive({})

async function create () {
  // `useFetch` automatic request after first request, 
  // so use $fetch or stringify the reactive object.
  // https://github.com/nuxt/framework/issues/9422
  // https://github.com/nuxt/framework/issues/9905
  const { data, error } = await useF3tch(`/users/create`, {
    method: 'POST',
    body: JSON.stringify(user)
  })

  if (!data.value) {
    response.status = error.value.status
    response.message = error.value.message
    return
  }
  router.push(`/users/`)
}
 
function cancel () {
  router.push(`/users/`)
}
</script>
