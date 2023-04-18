<template>
  <p v-if="isServerPostEvent">
    Well done! Resources are updated on the server side.
  </p>
  <div v-else>
    <site-header />
    <nav-main />
    <NuxtPage />
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const runtimeConfig = useRuntimeConfig()
const { items } = useCart()

const isServerPostEvent = ref(false)
const requestMethods = ['PATCH', 'POST', 'PUT', 'DELETE']

if (import.meta.env.SSR) {
  // https://nuxt.com/docs/api/composables/use-request-event
  const event = useRequestEvent()

  const req = event.node.req
  const url = event.node.req.url
  const string = url.substring(url.indexOf('?'))
  const params = new URLSearchParams(string)

  if (requestMethods.includes(req.method)) {
    isServerPostEvent.value = true
  }

  if (params.has('cart') && params.get('cart') === 'set') {
    items.value = await normalizeBody(req)
  }
} else {
  const id = runtimeConfig.public['appCartId']
  const cart = localStorage.getItem(id)
  items.value =  JSON.parse(cart) ?? []
}
</script>
