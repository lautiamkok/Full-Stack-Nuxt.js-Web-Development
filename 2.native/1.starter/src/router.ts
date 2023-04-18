'use strict'

import fs from 'fs'
import findmyway from 'find-my-way'

// https://github.com/delvedor/find-my-way
const router = findmyway()

// http://localhost:5000
router.on('GET', '/', (req, res) => {
  res.end('{"message":"hello world"}')
})

// Serve static files on /public route only with the `/public/*` setting. Also
// can be on any route, e.g. `/contents` with the `/*` setting. Examples:
// http://localhost:5000/public/R0003515.jpg
// http://localhost:5000/public/世界/R0003515.jpg
// http://localhost:5000/public/fixtures/hello.txt
router.on('GET', '/public/*', (req, res) => {
  // Use `decodeURIComponent` to decode non-English characters in the URL.
  fs.readFile(`./${decodeURIComponent(req.url)}`, (err,data) => {
    if (err) {
      // Overide the default statusCode code.
      res.statusCode = 404
      
      res.end(JSON.stringify({
        message: 'File not found or you made an invalid request.',
        data: err
      }))
      return
    }
    // Override the default content type.
    res.setHeader('Content-Type', 'text/plain')

    res.end(data)
  })
})

// http://localhost:5000/xxxx
// {"test":"xxxx"}
router.on('GET', '/:test', (req, res, params) => {
  res.end(JSON.stringify(params))
})

// http://localhost:5000/hello
router.on('GET', '/hello', (req, res, params) => {
  // Auto import from the `/composables` dir.
  const { message } = useHello()
  console.log('message from composables =', message)

  // Auto import from the `/utils` dir.
  console.log('message from utils =', hello())
  
  res.end('{"winter":"is here"}')
})

router.on('GET', '*', (req, res) => {
  // Overide the default statusCode code.
  // Send json data.
  res.statusCode = 404
  res.end('{"message":"page not found!"}')
})

export default router
