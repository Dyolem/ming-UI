import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tsxResolveTypes from 'vite-plugin-tsx-resolve-types'
import dts from 'vite-plugin-dts'

const baseUrl = fileURLToPath(new URL('.', import.meta.url))
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    tsxResolveTypes(),
    dts({
      entryRoot: 'src',
      outDir: ['es', 'lib'],
      exclude: ['**/test/**'],
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^@ming-UI\/utils/,
        replacement: path.resolve(baseUrl, '../../packages/utils/src'),
      },
      {
        find: /^@ming-UI\/icons/,
        replacement: path.resolve(baseUrl, '../../packages/icons/src'),
      },
    ],
  },
  build: {
    rollupOptions: {
      external: ['vue', '@floating-ui/vue', '@types/lodash-es', '@v-c/utils', '@vue-ming-elements/utils', '@vue-ming-elements/icons'],
      output: [
        {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          format: 'esm',
          dir: 'es',
        },
        {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          exports: 'named',
          format: 'cjs',
          dir: 'lib',
        },
      ],
    },
    lib: {
      entry: 'src/index.ts',
    },
  },
})
