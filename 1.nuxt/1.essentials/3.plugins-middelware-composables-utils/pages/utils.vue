<template>
  <h2>
    Utils
  </h2>
  <p>
    doSomething: {{ doSomething() }}
  </p>

  <p>
    isJson: {{ isJson('hello world') }}
  </p>
</template>

<script setup>
const string = '{"name":"John", "age":30, "car":null}'
console.log('is json =', isJson(string))
</script>
