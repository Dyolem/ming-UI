import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],

  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'vue',
        },
      },
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['umd'],
      fileName: () => 'mingIcons.js',
      name: 'mingIcons',
    },
  },
})
