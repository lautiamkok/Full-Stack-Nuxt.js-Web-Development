'use strict'

export default async (path, options = {}) => {
  let data = null
  let res = null
  const baseURL = options.baseURL ?? import.meta.env.VITE_API_BASE_URL

  // Stringify body and adding a json content-type before sending.
  if (options.body) {
    options.body = JSON.stringify(options.body)
    options.headers = { 'Content-Type': 'application/json' }
  }

  // Fetch the data and catch errors.
  try {
    res = await fetch(`${baseURL}${path}`, options)
  } catch (err) {
    // Only network errors are regarded as true errors by Node.js Fetch API.
    // That means errors (e.g. 404, 400, 500) sent by the server are not taken
    // into account. So errors only can be caught here if the user is not
    // connected to the internet or if a networking error occurs. And that you
    // will always get this error `TypeError: TypeError: Failed to fetch`.
    throw Error(err)
  }

  data = await res.json()
  if (!res.ok) {
    // Status code: 400, 401, 404, 500, etc.
    // Status text: Bad Request, Unauthorized, Not Found, Internal Server Error, etc.
    // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    const error = new Error(`${res.statusText} ${res.url}`)
    error.statusCode = res.status
    error.statusText = res.statusText
    error.message = data.message
    throw error
  }
  
  data = data.data ?? data
  return { data }
}

// Or, install and use `ofetch` for better error handling.
// https://github.com/unjs/ofetch
// import { ofetch } from 'ofetch'
// export default async (path, options = {}) => {
//   let data = null
//   options.baseURL = options.baseURL ?? import.meta.env.VITE_API_BASE_URL

//   // Fetch the data and catch errors.
//   try {
//     data = await ofetch(path, options)
//   } catch (err) {
//     // Catch "ERR_CONNECTION_REFUSED" here and throw it upwards.
//     if (!err.data) {
//       throw new Error('No network!')
//     }
//     const error = new Error(err)
//     error.statusCode = err.statusCode
//     error.name = err.name
//     throw error
//   }

//   data = data.data ?? data
//   return { data }
// }
