'use strict'

export function throwError (error) {
  // Get the error info from the standard JS error object.
  const data = {
    status: error.status || 500,
    name: error.name,
    message: error.message,
    stack: error.stack,
  }

  // If it is an H3Error.
  if (isError(error)) {
    data.status = error.statusCode
    data.message = error.statusMessage
  }

  throw createError({
    statusCode: data.status,
    statusText: data.message,
    data
  })
}
