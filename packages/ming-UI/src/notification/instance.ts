import { createVNode, render } from 'vue'
import type { NotificationConfig, NotificationInstance } from './interface'
import Notification from './Notification.vue'

export function createNotification() {
  let instance: NotificationInstance
  const notify = (config: NotificationConfig) => {
    if (!instance) {
      const target = config.appendTo || document.body
      const vm = createVNode(Notification, {
        onReady(_instance: NotificationInstance) {
          instance = _instance
          instance.add(config)
        },
      })
      if (config.appContext)
        vm.appContext = config.appContext

      render(vm, target)
    }
    else {
      instance.add(config)
    }
  }

  const close = (id?: number) => {
    if (instance)
      instance.close(id)
  }
  const closeAll = () => {
    if (instance)
      instance.closeAll()
  }

  return {
    notify,
    close,
    closeAll,
  }
}
