'use strict'

import stream from 'node:stream'
import fs from 'fs'

export default async (src, filename) => {
  const desc = fs.createWriteStream('./assets/images/' + filename)
  
  // Using Node.js native fetch API to fetch and create resources from the
  // remote server. 
  // https://nodejs.org/dist/latest-v18.x/docs/api/globals.html
  // https://nodejs.org/api/stream.html#streamreadablefromwebreadablestream-options
  stream.Readable
    .fromWeb((await fetch(src)).body)
    .pipe(desc)

  // Or, install and use axios:
  // const { data } = await axios({
  //   url: src,
  //   method: 'GET',
  //   responseType: 'stream'
  // })
  // data.pipe(desc)
}
