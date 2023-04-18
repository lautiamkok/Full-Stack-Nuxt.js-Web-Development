'use strict'

export default (src, relativePath) => {
  if (!src) {
    return
  }

  const array = src.split('/')
  const filename = [...array].pop()
  const images = import.meta.globEager('/assets/images/*.{jpg,jpeg,png,svg}')
  const image = images[`/assets/images/${filename}`]
  if (image !== undefined) {
    return image.default
  }
  console.log(`${filename} doesn't exist locally!`)

  // Use Vite's way to store env variables and access them directly.
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  const isStream = import.meta.env.VITE_STREAM
  if (relativePath) {
    src = `${apiBaseUrl}${relativePath}${filename}`
  }

  // Stream resources on production for the static site.
  if (import.meta.env.SSR && isStream === 'true') {
    useStream(src, filename)
  }

  // Get the image from the remote API if it has the full URL path already.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }
  return
}
