<template>
  <div v-if="user">
    <h2>
      Delete {{ user.name }}?
    </h2>
    <ul>
      <li>
        <button v-on:click="cancel">
          Cancel
        </button>
      </li>
      <li>
        <button v-on:click="remove">
          Confirm
        </button>
      </li>
    </ul>
  </div>

  <!-- Use `showError` on the `error-handler` page -->
  <error-handler 
    v-bind:error="error" 
    v-else 
  />

  <p style="color: red;" v-if="response.status && response.status != 200">
    {{ response.message }}
  </p>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const id = route.params.id

const response = reactive({})
const { data: user, error } = await useF3tch(`/users/${id}`)

async function remove () {
  const { data, error } = await useF3tch(`/users/delete/${id}`, {
    method: 'DELETE',
    key: true
  })

  if (!data.value) {
    response.status = error.value.status
    response.message = error.value.message
    return
  }
  router.push(`/users/`)
}
 
function cancel () {
  router.push(`/users/${id}`)
}
</script>
