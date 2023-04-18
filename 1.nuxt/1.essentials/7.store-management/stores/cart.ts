'use strict'

// https://pinia.vuejs.org/core-concepts/
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
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

    // Store items to `localstorage` and send them to the server.
    storeItems(items) 
  }

  function empty () {
    items.value = []

    // Store items to `localstorage` and send them to the server.
    storeItems(items) 
  }

  function storeItems (items) {
    const runtimeConfig = useRuntimeConfig()
    const appBaseUrl = runtimeConfig.public['appBaseUrl']
    const id = runtimeConfig.public['appCartId']
    const body = JSON.stringify(unref(items))

    localStorage.setItem(id, body)
    fetch(`${appBaseUrl}?cart=set`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body
    })

    if (unref(items).length === 0) {
      localStorage.removeItem(id)
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
