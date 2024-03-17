import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import { vitepressDemo } from 'vite-plugin-vitepress-demo'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tsxResolveTypes from 'vite-plugin-tsx-resolve-types'

const baseUrl = fileURLToPath(new URL('.', import.meta.url))
// import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueJsx(),
    vitepressDemo({
      glob: ['**/demos/*.vue'],
    }),
    tsxResolveTypes(),
  ],
  resolve: {
    alias: [
      {
        find: /^ming-UI/,
        replacement: path.resolve(baseUrl, 'packages/ming-UI/src'),
      },
      {
        find: /^@ming-UI\/utils/,
        replacement: path.resolve(baseUrl, 'packages/utils/src'),
      },
      {
        find: /^@ming-UI\/icons/,
        replacement: path.resolve(baseUrl, 'packages/icons/src'),
      },
    ],
  },
})
