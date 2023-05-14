<template>
  <site-header />
  <nav-main />
  <NuxtPage />
</template>

<script setup>
if (!import.meta.env.SSR) {
  const runtimeConfig = useRuntimeConfig()
  const cartId = runtimeConfig.public['appCartId']
  const cookie = useCookie(cartId)
  const { items } = useCart()

  // If cookie is gone, that means the data in Redis is gone too, so delete
  // the cart in `localstorage` too.
  if (!cookie.value) {
    localStorage.removeItem(cartId)
  }
  const cart = localStorage.getItem(cartId)
  items.value =  JSON.parse(cart) ?? []
}
</script>
