// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme'
import ming from 'ming-UI'

import icons from '@ming-UI/icons'
import 'ming-UI/styles.ts'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router }) {
    app.component('Demo', AntdTheme)
    app.use(ming)
    app.use(icons)
    // eslint-disable-next-line node/prefer-global/process
    const rootUrl = process.env.NODE_ENV === 'production' ? '/ming-UI/' : '/'
    router.onBeforePageLoad = (to) => {
      if (to === rootUrl) {
        router.go('/zh-CN/') // 使用router.go进行路由跳转
        return false // 阻止原本的路由变更
      }
    }
  },
} satisfies Theme
