import { useCartStore } from '@/stores/cart'

// https://nuxt.com/docs/guide/directory-structure/middleware
export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log('global middleware from `/middleware/` that runs on every route change')
  if (import.meta.env.SSR) {
    const runtimeConfig = useRuntimeConfig()
    const cartId = runtimeConfig.public['appCartId']
    const store = useCartStore()

    // Reset before populating.
    store.cart = []
    
    // Get the value of the cart from cookie and use it to set a key for Redis
    // db to retrieve the data for us.
    // https://nuxt.com/docs/api/composables/use-request-event
    // const event = useRequestEvent()
    // const req = event.node.req
    // const cookie = req.headers.cookie
    const cookie = useCookie(cartId) || null
    const key = cookie.value ? `${cartId}:${cookie.value}` : null
    // console.log('cookie =', cookie.value)
    // console.log('key =', key)

    if (key) {
      const { data } = await useFetch(`/api/carts/${key}`)
      const cartFromRedis = data.value ?? []
      store.cart = cartFromRedis
    }
  }
})
