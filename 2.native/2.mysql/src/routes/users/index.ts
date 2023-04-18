'use strict'

export default ctxHandler(async () => {
  const { pool } = useMysql()
  const query = sql(`
    SELECT 
      'id', 
      'name', 
      'slug', 
      'created_on', 
      'updated_on' 
    FROM 'user'
  `)

  return await pool.query(query)
})

// A long option:
// export default async (req, res) => {
//   const { pool } = useMysql()

//   let data = null
//   let statusCode = 200
//   try {
//     const query = sql(`
//       SELECT 
//         'id', 
//         'name', 
//         'slug', 
//         'created_on', 
//         'updated_on' 
//       FROM 'user'
//     `)

//     data = await pool.query(query)
//   } catch (e) {
//     statusCode = 500
//     data = {
//       name: e.name,
//       message: e.message,
//       stack: e.stack
//     }
//   }
//   data = JSON.stringify(data)

//   return {
//     statusCode,
//     data
//   }
// }
