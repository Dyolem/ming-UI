import { defineConfig } from 'vitest/config'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tsxResolveTypes from 'vite-plugin-tsx-resolve-types'
import vue from '@vitejs/plugin-vue'
import alias from './alias'

export default defineConfig({
  plugins: [
    vueJsx(),
    tsxResolveTypes(),
    vue(),
  ],
  resolve: {
    alias,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // reporters: ['default', 'html'],
    coverage: {
      // enabled: true,
      provider: 'v8',
      reporter: ['text'],
      include: ['packages/**', '!packages/**/docs', '!packages/**/demos'],
    },
  },
})
