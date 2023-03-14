// https://github.com/axe-me/vite-plugin-node
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { resolve } from 'path'

export default defineConfig({
  // ...vite configures
  server: {
    // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
    port: 5000
  },
  define: {
    // Define Node env here so that you can access them within your app.
    "process.env": process.env,
  },
  // Vite does not support alias in html files.
  // https://github.com/vitejs/vite/issues/3000
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
  plugins: [
    // https://github.com/axe-me/vite-plugin-node
    ...VitePluginNode({
      // `Express` adapter.
      adapter: 'express',

      // Tell the plugin where is your project entry.
      appPath: './src/app.ts',
    }),
  ]
})
