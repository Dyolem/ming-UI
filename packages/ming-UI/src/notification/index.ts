import type { App } from 'vue'
import Notification from './Notification.vue'
import MNotificationPlugin, { MNotification } from './notificationPlugin'

Notification.install = (app: App) => {
  app.component(Notification.name as string, Notification)
  app.use(MNotificationPlugin)
}

export default Notification
export { MNotification }
