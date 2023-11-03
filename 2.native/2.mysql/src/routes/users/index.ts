'use strict'

export default ctxHandler(async () => {
  const { pool } = await useMariadb()
  const query = toSql(`
    SELECT 
      'id', 
      'name', 
      'slug', 
      'created_on', 
      'updated_on' 
    FROM 'users'
  `)

  const rows = await pool.query(query)
  pool.end()
  
  return rows
})

// A long option:
// export default async (req, res) => {
//   const { pool } = await useMysql()

//   let data = null
//   let statusCode = 200
//   try {
//     const query = toSql(`
//       SELECT 
//         'id', 
//         'name', 
//         'slug', 
//         'created_on', 
//         'updated_on' 
//       FROM 'users'
//     `)

//     const [rows, fields] = await pool.query(query)
//     data = rows
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
