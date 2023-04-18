'use strict'

export default (text = null) => {
  const message = text ?? 'Hello'
  return {
    message
  }
}
