// plugin/myComponentPlugin.js
import { createVNode, render } from 'vue'
import type { App, Plugin } from 'vue'

import ColorPicker from './ColorPicker.vue'

// 导入你的组件

export default {
  install(app: App) {
    app.config.globalProperties.$openColorPicker = function () {
      const container = document.createElement('div')
      const vNode = createVNode(ColorPicker)
      render(vNode, container)
      document.body.appendChild(container)

      return {
        destroy() {
          render(null, container)
          document.body.removeChild(container)
        },
      }
    }
  },
} as Plugin
