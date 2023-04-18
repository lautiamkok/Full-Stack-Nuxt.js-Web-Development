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
// https://socket.io/docs/v4/client-initialization/
import io from 'socket.io-client'

const runtimeConfig = useRuntimeConfig()
const socket = io(runtimeConfig.public['apiBaseUrl'])
const { data: users, error } = await useF3tch('/users')

socket.on('users.changefeeds', data => {
  // Make sure there are new_val & old_val in data.
  if (data.new_val === undefined && data.old_val === undefined) {
    return
  }

  // Prepend the new user at the beginning of the array.
  if(data.old_val === null && data.new_val !== null) {
    users.value.unshift(data.new_val)
  }

  // Pop off the deleted user.
  if(data.new_val === null && data.old_val !== null) {
    var id = data.old_val.id
    // Find index of the deleted item.
    var index = users.value.map(el => {
      return el.id
    }).indexOf(id)
    users.value.splice(index, 1)
  }

  // Update the current user.
  if(data.new_val !== null && data.old_val !== null) {
    var id = data.new_val.id
    // Another method finding index of an item.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    // var index = array.findIndex(function(item) {return item.id === id})
    var index = users.value.findIndex(item => item.id === id)
    users.value.splice(index, 1, data.new_val)
  }
})
</script>
