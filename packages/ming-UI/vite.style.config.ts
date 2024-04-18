import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import fs from 'fs-extra'
import mergeStylesPlugin from '../../scripts/mergeStylesPlugin'

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
        const mingUIPath = fileURLToPath(new URL('./dist', import.meta.url))
        const styleFilePath = path.resolve(mingUIPath, 'ming-ui-style.js')
        fs.removeSync(styleFilePath)
        mergeStylesPlugin()
      },
    },

  ],
})
