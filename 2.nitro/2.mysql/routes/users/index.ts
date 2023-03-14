'use strict'

export default eventHandler(async event => {
  const query = sql(`
    SELECT 
      'id', 
      'name', 
      'slug', 
      'created_on', 
      'updated_on' 
    FROM 'user'
  `)
  return await mysql.query(query)
})
