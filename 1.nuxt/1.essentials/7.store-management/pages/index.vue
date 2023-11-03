<template>
  <p>
    Hello World!
  </p>
  <p>
    store.count: {{ store.count }}
  </p>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
</script>
