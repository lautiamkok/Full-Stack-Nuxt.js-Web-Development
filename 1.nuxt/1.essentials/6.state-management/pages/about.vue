<template>
  <p>{{ message }}</p>
</template>

<script setup>
const message = useState('message')

// Change the original state.
message.value = 'Hello About!'
</script>
