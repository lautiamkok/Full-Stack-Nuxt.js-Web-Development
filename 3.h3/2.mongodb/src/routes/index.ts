'use strict'

// No need to manually import h3 if using `unjs/unimport`.
// import { eventHandler } from 'h3'

export default eventHandler(() => {
  return { 
    message: 'Hello World!'
  }
})
