<template>
  <h2>
    Plugins
  </h2>
  <h3>
    Foo
  </h3>
  <p>
    $greet (client-server): {{ $greet('Marlene') }}
  </p>
  <ClientOnly>
    <p>
      $hi (client-only): {{ $hi('Molly') }}
    </p>
  </ClientOnly>
  <h3>
    Baz
  </h3>
  <p>
    $apiBaseUrl (client-server): {{ $apiBaseUrl }}
  </p>
  <p>
    $foo (client-server, a composable used in the plugin): {{ $foo }}
  </p>
</template>

<script setup>
// Call the plugins when you want to use them in the script block.
const { $hello, $greet } = useNuxtApp()
console.log($greet('Matt'))

// Make sure to call the plugin on the server side only.
if (process.server) {
  console.log('server only:', $hello('John'))
}
</script>
