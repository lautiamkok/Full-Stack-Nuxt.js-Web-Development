export default eventHandler(async () => {
  const message = await toUppercase('Hello World!')
  return { message }
})

// export default eventHandler(() => {
//   return { message: 'Hello World!' }
// })
