'use strict'

// Read More:
// https://vuejs.org/guide/reusability/composables.html#composables

async function getA () {
  return 'A'
}

async function getB () {
  return 'B'
}

// Export as a default object.
// Usage:
// import useSample from '@/composables/sample'
// const { getA, getB } = useSample
export default {
  getA,
  getB
}

// Export as a default function.
// Usage:
// import useSample from '@/composables/sample'
// const { getA, getB } = useSample()
export default () => {
  return {
    getA,
    getB
  }
}

// Export as an object. No default.
// Usage:
// import { getA, getB } from '@/composables/sample'
export {
  getA,
  getB
}

// Same as follows:

// Export as a function directly. No default.
// Usage:
// import { getC } from '@/composables/sample'
export async function getC () {
  return 'C'
}

// Export as a function directly. No default.
// Usage:
// import { getD } from '@/composables/sample'
export async function getD () {
  return 'D'
}
