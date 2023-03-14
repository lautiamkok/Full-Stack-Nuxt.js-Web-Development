<template>
  <div v-if="user">
    <h2>
      Update {{ user.name }}
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
      <li v-if="response.status">
        <button v-on:click="cancel">
          Back
        </button>
      </li>
      <li>
        <button v-on:click="cancel">
          Cancel
        </button>
      </li>
      <li>
        <button v-on:click="update">
          Update
        </button>
      </li>
    </ul>

    <p style="color: red;" v-if="response.status && response.status != 200">
      {{ response.message }}
    </p>
    <p style="color: blue;" v-if="response.status && response.status === 200">
      {{ response.message }}
    </p>
  </div>

  <!-- Use `showError` on the `error-handler` page -->
  <error-handler 
    v-bind:error="error" 
    v-else 
  />
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const id = route.params.id

const response = reactive({})
const { data: user, error } = await useF3tch(`/users/${id}`)

async function update () {
  const { data, error } = await useF3tch(`/users/update/${id}`, {
    method: 'PUT',
    key: true,

    // Stringify the reactive object to avoid multiple requests when interacting
    // with the input fields.
    body: JSON.stringify(user.value)
  })

  if (!data.value) {
    response.status = error.value.status
    response.message = error.value.message
    return
  }
  response.status = 200
  response.message = 'Updated ok'

  // Or just navigate to the user page.
  // router.push(`/users/${id}`)
}
 
function cancel () {
  router.push(`/users/${id}`)
}
</script>
