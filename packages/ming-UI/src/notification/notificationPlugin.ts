import { createVNode, render } from 'vue'
import type { App, Plugin } from 'vue'
import Notification from './Notification.vue'

export function MNotification() {
  const container = document.createElement('div')
  const vNode = createVNode(Notification)
  render(vNode, container)
  document.body.appendChild(container)

  return {
    destroy() {
      render(null, container)
      document.body.removeChild(container)
    },
  }
}

export default {
  install(app: App) {
    app.config.globalProperties.$MNotification = MNotification
  },
} as Plugin
