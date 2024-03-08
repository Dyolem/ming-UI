import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import { vitepressDemo } from 'vite-plugin-vitepress-demo'

const baseUrl = fileURLToPath(new URL('.', import.meta.url))
// import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitepressDemo({
      glob: ['**/demos/*.vue'],
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^@ming-UI\/utils/,
        replacement: path.resolve(baseUrl, 'packages/utils/src'),
      },
    ],
  },
})
