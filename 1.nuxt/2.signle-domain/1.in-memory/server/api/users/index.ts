'use strict'

export default eventHandler(async event => {
  const db = connectDb()
  return await db.getItem('users') || []
})
