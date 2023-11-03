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
  
  <button type="button" @click="countA++">
    count is {{ countA }}
  </button>
  <button type="button" @click="countB++">
    countB (provide/inject) is {{ countB }}
  </button>
  <button type="button" @click="countC++">
    countC (useState) is {{ countC }}
  </button>
</template>

<script setup>
// Change the original state:
// A:
const countA = useCount()
countA.value = 1

// B:
const countB = inject('count')
countB.value = 100

// C:
const countC = useState('count')
countC.value = 200
</script>
