import { defineConfig } from 'vite'
import { vitepressDemo } from 'vite-plugin-vitepress-demo'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tsxResolveTypes from 'vite-plugin-tsx-resolve-types'
import Component from 'unplugin-vue-components/vite'
import alias from './alias'
import { mingUIResolver } from './scripts/ming-ui-resolver'

// import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueJsx(),
    vitepressDemo({
      glob: ['**/examples/**/*.vue'],
    }),
    tsxResolveTypes(),
    // Component({
    //   resolvers: [mingUIResolver()],
    // }),
  ],
  resolve: {
    alias,
  },
})
