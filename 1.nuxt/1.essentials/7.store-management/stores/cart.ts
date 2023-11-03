'use strict'

// https://pinia.vuejs.org/core-concepts/
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const runtimeConfig = useRuntimeConfig()
  const cartId = runtimeConfig.public['appCartId']
  const days = 1
  const options = {
    path: '/',

    // Expire in [x] minutes.
    maxAge: 5 * 60 
    
    // Or, in [x] number of days.
    // maxAge: days * 24 * 60 * 60
    
    // Or:
    // days
  }
  const { 
    set: setCookie, 
    get: getCookie, 
    drop: dropCookie
  } = useCooki3(options)

  const cart = ref([])
  const response = reactive({
    message: '',
    data: ''
  })
  const uniqueLength = computed(() => cart.value.length)
  const sumQuantity = computed(() => {
    // Sum the items by the `quantity` key.
    return cart.value.reduce((accumulator, object) => 
      Number(object.quantity) + accumulator, 0
    )
  })
  const sumCost = computed(() => {
    // Sum the cost by the `cost` key.
    const costs = cart.value.reduce((accumulator, object) => 
      Number(object.cost) + accumulator, 0
    )
    return costs.toFixed(2)
  })

  // Promisise setTimeout.
  // Usage:
  // await delay(500)
  async function delay (ms) {
    return new Promise(res => {
      setTimeout(res, ms)
    })
  }

  async function addItem (item) {
    // Don't push the item if it exists already, update the item's quantity
    // instead. Find the match using id because the quantity can change.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    const exist = cart.value.some(product => product.id === item.id)
    if (exist === true) {
      await updateItem(item)
      return
    }

    // Set new cookie key with a value for the cart when the cart is started empty
    // each time.
    if (uniqueLength.value === 0) {
      const timestamp = Date.now()
      setCookie(cartId, timestamp)
    }

    // Update cookie's expiration the cart is updated each time.
    if (uniqueLength.value > 0) {
      const value = getCookie(cartId)
      setCookie(cartId, value)
    }

    cart.value.push(item)

    // Store cart to `localstorage` and send them to the server.
    storeCart(cart) 

    response.message = 'Added ok'
    response.data = item
    await delay(3000)
    response.message = ''
    response.data = ''
  }

  async function updateItem (item) {
    // Find the index of the current element.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    const index = cart.value.findIndex((element, index) => {
      if (element.id === item.id) {
        return true
      }
    })

    cart.value[index].quantity = item.quantity
    cart.value[index].cost = item.cost

    // Update cookie's expiration the cart is updated each time.
    if (uniqueLength.value > 0) {
      const value = getCookie(cartId)
      setCookie(cartId, value)
    }

    // Store cart to `localstorage` and send them to the server.
    storeCart(cart) 

    response.message = 'Updated ok'
    response.data = item
    await delay(3000)
    response.message = ''
    response.data = ''
  }

  function deleteItem (item) {
    // Find the index of the current element.
    const index = cart.value.findIndex((element, index) => {
      if (element.id === item.id) {
        return true
      }
    })

    // Delete the item from store.
    cart.value.splice(index, 1)

    // Update cookie's expiration the cart is updated each time.
    if (uniqueLength.value > 0) {
      const value = getCookie(cartId)
      setCookie(cartId, value)
    }

    // Store cart to `localstorage` and send them to the server.
    storeCart(cart) 
  }

  function empty () {
    cart.value = []

    // Store cart to `localstorage` and send them to the server.
    storeCart(cart) 
  }

  async function storeCart (cart) {
    const body = JSON.stringify(unref(cart))
    localStorage.setItem(cartId, body)

    const { data } = await useFetch(`/api/carts/create/one`, {
      method: 'POST',
      body
    })
    
    if (unref(cart).length === 0) {
      localStorage.removeItem(cartId)
      dropCookie(cartId)
    }
  }

  return {
    response,
    cart,
    uniqueLength,
    sumQuantity,
    sumCost,
    addItem,
    updateItem,
    deleteItem,
    empty
  }
})
