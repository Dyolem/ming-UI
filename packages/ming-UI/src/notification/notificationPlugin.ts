import { createVNode, render } from 'vue'
import type { App, Plugin } from 'vue'
import Notification from './Notification.vue'
import type { NotificationProps } from './interface'

export function MNotification(config: NotificationProps) {
  const { title, message, type } = config
  const container = document.createElement('div')
  const vNode = createVNode(Notification, { title, message, type })
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
