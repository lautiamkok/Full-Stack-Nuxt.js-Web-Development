'use strict'

export default eventHandler(async event => {
  const db = makeDb()
  return await db.getItem('users') || []
})
