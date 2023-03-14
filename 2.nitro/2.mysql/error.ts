// https://nitro.unjs.io/config#errorhandler
import type { NitroErrorHandler } from 'nitropack'

export default <NitroErrorHandler> function (error, event) {
  // Get the error info from the JS native error.
  const body = {
    status: error.status || 500,
    name: error.name || 'Internal Server Error',
    message: error.message || '500 error occurred',
    stack: error.stack || null
  }

  // Error from h3.
  if (isError(error)) {
    body.status = error.statusCode
    body.message = error.statusMessage
  }

  // Set the response header content type: json.
  // https://www.jsdocs.io/package/h3#setResponseHeader
  setResponseHeader(
    event,
    'Content-Type', 
    'application/json'
  )

  // Set the response status code: 404, 500, etc.
  // https://www.jsdocs.io/package/h3#setResponseStatus
  setResponseStatus(event, body.status)

  // Jsonify the object.
  event.res.end(JSON.stringify(body, null, ' '))
}
