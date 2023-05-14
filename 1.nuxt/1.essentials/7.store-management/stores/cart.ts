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

  const { items } = useCart()
  const response = reactive({
    message: '',
    data: ''
  })
  const getItems = computed(() => items.value)
  const uniqueLength = computed(() => items.value.length)
  const sumQuantity = computed(() => {
    // Sum the items by the `quantity` key.
    return items.value.reduce((accumulator, object) => 
      Number(object.quantity) + accumulator, 0
    )
  })
  const sumCost = computed(() => {
    // Sum the cost by the `cost` key.
    const costs = items.value.reduce((accumulator, object) => 
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
    const exist = items.value.some(product => product.id === item.id)
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

    items.value.push(item)

    // Store items to `localstorage` and send them to the server.
    storeItems(items) 

    response.message = 'Added ok'
    response.data = item
    await delay(3000)
    response.message = ''
    response.data = ''
  }

  async function updateItem (item) {
    // Find the index of the current element.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    const index = items.value.findIndex((element, index) => {
      if (element.id === item.id) {
        return true
      }
    })

    items.value[index].quantity = item.quantity
    items.value[index].cost = item.cost

    // Update cookie's expiration the cart is updated each time.
    if (uniqueLength.value > 0) {
      const value = getCookie(cartId)
      setCookie(cartId, value)
    }

    // Store items to `localstorage` and send them to the server.
    storeItems(items) 

    response.message = 'Updated ok'
    response.data = item
    await delay(3000)
    response.message = ''
    response.data = ''
  }

  function deleteItem (item) {
    // Find the index of the current element.
    const index = items.value.findIndex((element, index) => {
      if (element.id === item.id) {
        return true
      }
    })

    // Delete the item from store.
    items.value.splice(index, 1)

    // Update cookie's expiration the cart is updated each time.
    if (uniqueLength.value > 0) {
      const value = getCookie(cartId)
      setCookie(cartId, value)
    }

    // Store items to `localstorage` and send them to the server.
    storeItems(items) 
  }

  function empty () {
    items.value = []

    // Store items to `localstorage` and send them to the server.
    storeItems(items) 
  }

  async function storeItems (items) {
    const body = JSON.stringify(unref(items))
    localStorage.setItem(cartId, body)

    const { data } = await useFetch(`/api/carts/create/one`, {
      method: 'POST',
      body
    })
    // console.log('cart set =', data.value)
    
    if (unref(items).length === 0) {
      localStorage.removeItem(cartId)
      dropCookie(cartId)
    }
  }

  return {
    response,
    items,
    getItems,
    uniqueLength,
    sumQuantity,
    sumCost,
    addItem,
    updateItem,
    deleteItem,
    empty
  }
})
