<template>
  <h2>
    Composables
  </h2>
  <p>
    Named export `useA`: {{ a }}
  </p>
  <p>
    Named export `useB`: {{ b }}
  </p>
  <p>
    Named export `useC`: {{ c }}
  </p>
  <p>
    Named export `useD`: {{ d }}
  </p>
  <p>
    Default export `useFoo`: {{ foo }}
  </p>
  <p>
    Nested default export `useBaz`: {{ useBaz() }}
  </p>
</template>

<script setup>
// Note that no need to de-structure the exported functions from composables.
const a = useA()
const b = useB()
const c = useC()
const d = useD()
const foo = useFoo()
console.log(useBaz())
</script>
