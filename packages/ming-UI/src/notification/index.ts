import type { App } from 'vue'
import Notification from './Notification.vue'

Notification.install = (app: App) => {
  app.component(Notification.name as string, Notification)
}

export default Notification
