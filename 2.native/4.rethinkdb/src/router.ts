'use strict'

import fs from 'fs'
import findmyway from 'find-my-way'

// Import routes.
import index from '@/routes/index'
import users from '@/routes/users/index'
import userBySlug from '@/routes/users/slug'
import userCreate from '@/routes/users/create'
import userUpdateById from '@/routes/users/update'
import userDeleteById from '@/routes/users/delete'

// https://github.com/delvedor/find-my-way
const router = findmyway()

// http://localhost:5000
router.on('GET', '/', async (req, res) => {
  const ctx = { 
    req, 
    message: 'Hello World!!' 
  }
  const { data, statusCode } = await index(ctx)
  res.statusCode = statusCode
  res.end(data)
})

// http://localhost:5000/users
router.on('GET', '/users', async (req, res) => {
  const ctx = { req }
  const { data, statusCode } = await users(ctx)
  res.statusCode = statusCode
  res.end(data)
})

// http://localhost:5000/users/[slug]
router.on('GET', '/users/:slug', async (req, res, params) => {
  const ctx = { req, params }
  const { data, statusCode } = await userBySlug(ctx)
  res.statusCode = statusCode
  res.end(data)
})

// POST http://localhost:5000/users/create
router.on('POST', '/users/create', async (req, res) => {
  const ctx = { req }
  const { data, statusCode } = await userCreate(ctx)
  res.statusCode = statusCode
  res.end(data)
})

// PUT http://localhost:5000/users/update/[id]
router.on('PUT', '/users/update/:id', async (req, res, params) => {
  const ctx = { req, params }
  const { data, statusCode } = await userUpdateById(ctx)
  res.statusCode = statusCode
  res.end(data)
})

// DELETE http://localhost:5000/users/delete/[id]
router.on('DELETE', '/users/delete/:id', async (req, res, params) => {
  const ctx = { req, params }
  const { data, statusCode } = await userDeleteById(ctx)
  res.statusCode = statusCode
  res.end(data)
})

// Serve static files on /public route only with the `/public/*` setting. Also
// can be on any route, e.g. `/contents` with the `/*` setting. Examples:
// http://localhost:5000/public/R0003515.jpg
// http://localhost:5000/public/世界/R0003515.jpg
// http://localhost:5000/public/fixtures/hello.txt
router.on('GET', '/public/*', (req, res) => {
  // Use `decodeURIComponent` to decode non-English characters in the URL.
  fs.readFile(`./${decodeURIComponent(req.url)}`, (err, data) => {
    if (err) {
      res.statusCode = 404
      res.end(JSON.stringify({
        message: 'File not found or you made an invalid request.',
        data: err
      }))
      return
    }
    res.setHeader('Content-Type', 'text/plain')
    res.end(data)
  })
})

router.on('GET', '*', (req, res) => {
  res.statusCode = 404
  res.end('{"message":"page not found!"}')
})

export default router
