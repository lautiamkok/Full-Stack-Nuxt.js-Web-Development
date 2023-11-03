'use strict'

// Use Node.js built-in `crypto` to generate UUIDs.
import crypto from 'crypto'

// Add a user:
// $ curl -X POST http://localhost:5000/users/create \
//  -H "Content-Type: application/json" \
//  -d '{"name": "John", "slug": "john"}'
export default ctxHandler(async ctx => {
  const { pool } = await useMariadb()
  const body = await normalizeBody(ctx.req)

  if (body.name === undefined) {
    createError({
      statusCode: 500,
      message: 'name is undefined'
    })
  }

  if (body.slug === undefined) {
    createError({
      statusCode: 500,
      message: 'slug is undefined'
    })
  }

  if (body.name === '') {
    createError({
      statusCode: 400,
      message: 'name is required'
    })
  }

  if (body.slug === '') {
    createError({
      statusCode: 400,
      message: 'slug is required'
    })
  }

  const timestamp = Date.now()
  const user = {
    id: crypto.randomUUID(),
    name: body.name,
    slug: body.slug,
    createdAt: timestamp,
    updatedAt: timestamp
  }

  const query = toSql(`
    INSERT INTO 'users'(
      'id',
      'name',
      'slug',
      'created_on',
      'updated_on'
      ) VALUES (
      "${user.id}",
      "${user.name}",
      "${user.slug}",
      "${user.createdAt}",
      "${user.updatedAt}"
    )
  `)

  const result = await pool.query(query)
  pool.end()

  return result
})

// A long option:
// export default async (req, res) => {
//   const { pool } = useMysql()
//   const body = await normalizeBody(req)

//   let data = null
//   let statusCode = 200
//   try {
//     if (body.name === undefined) {
//       createError({
//         statusCode: 500,
//         message: 'name is undefined'
//       })
//     }

//     if (body.slug === undefined) {
//       createError({
//         statusCode: 500,
//         message: 'slug is undefined'
//       })
//     }

//     if (body.name === '') {
//       createError({
//         statusCode: 400,
//         message: 'name is required'
//       })
//     }

//     if (body.slug === '') {
//       createError({
//         statusCode: 400,
//         message: 'slug is required'
//       })
//     }

//     const timestamp = Date.now()
//     const user = {
//       id: crypto.randomUUID(),
//       name: body.name,
//       slug: body.slug,
//       createdAt: timestamp,
//       updatedAt: timestamp
//     }

//     const query = toSql(`
//       INSERT INTO 'users'(
//         'id',
//         'name',
//         'slug',
//         'created_on',
//         'updated_on'
//         ) VALUES (
//         "${user.id}",
//         "${user.name}",
//         "${user.slug}",
//         "${user.createdAt}",
//         "${user.updatedAt}"
//       )
//     `)

//     const data = await pool.query(query)
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
