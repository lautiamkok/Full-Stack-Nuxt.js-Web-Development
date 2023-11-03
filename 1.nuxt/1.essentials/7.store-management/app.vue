<template>
  <site-header />
  <nav-main />
  <NuxtPage />
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

if (!import.meta.env.SSR) {
  const runtimeConfig = useRuntimeConfig()
  const cartId = runtimeConfig.public['appCartId']
  const cookie = useCookie(cartId)
  const store = useCartStore()

  // If cookie is gone, that means the data in Redis is gone too, so delete
  // the cart in `localstorage` too.
  if (!cookie.value) {
    localStorage.removeItem(cartId)
  }
  const cartFromLocalStorage = localStorage.getItem(cartId)
  store.cart =  JSON.parse(cartFromLocalStorage) ?? []
}
</script>
