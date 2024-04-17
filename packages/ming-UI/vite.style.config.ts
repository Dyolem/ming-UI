import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import fs from 'fs-extra'

export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: () => 'ming-ui.css',
      },
    },
    lib: {
      entry: 'src/styles.ts',
      formats: ['es'],
      fileName: () => 'ming-ui-style.js',
    },
  },
  plugins: [
    {
      name: 'remove:ming-ui-style.js',
      closeBundle() {
        const tovPath = fileURLToPath(new URL('./dist', import.meta.url))
        const styleFilePath = path.resolve(tovPath, 'ming-ui-style.js')
        fs.removeSync(styleFilePath)
      },
    },
  ],
})
