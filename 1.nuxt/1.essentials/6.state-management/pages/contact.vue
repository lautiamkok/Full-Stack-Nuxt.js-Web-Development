<template>
  <p>
    countA (composable): {{ countA }}
  </p>
  <p>
    countB (provide/inject): {{ countB }}
  </p>
  <p>
    countC (useState): {{ countC }}
  </p>
</template>

<script setup>
const countA = useCount()
const countB = inject('count')
const countC = useState('count')
</script>
