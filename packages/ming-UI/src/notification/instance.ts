import { createVNode, render } from 'vue'
import type { AppContext } from 'vue'
import type { NotificationConfig, NotificationInstance } from './interface'
import Notification from './Notification.vue'

export function createNotification() {
  const instanceMap = new Map<string, { instance: NotificationInstance | null; container: HTMLDivElement | null }>([
    ['top-left', { instance: null, container: null }],
    ['top-right', { instance: null, container: null }],
    ['bottom-left', { instance: null, container: null }],
    ['bottom-right', { instance: null, container: null }],
  ])

  const notify = (config: NotificationConfig, appContext?: AppContext) => {
    const position = config.position || 'top-right'
    if (!instanceMap.get(position)?.instance) {
      const container = document.createElement('div')
      container.className = `notification-container-${position}`
      document.body.appendChild(container)

      const vm = createVNode(Notification, {
        onReady(_instance: NotificationInstance) {
          const entry = instanceMap.get(position)
          if (entry) {
            entry.instance = _instance
            entry.container = container
            entry.instance.add(config)
          }
        },
        onEmpty() {
          const entry = instanceMap.get(position)
          if (entry?.container) {
            render(null, entry.container) // 清空渲染
            document.body.removeChild(entry.container)
            instanceMap.set(position, { instance: null, container: null })
          }
        },
      })
      if (appContext)
        vm.appContext = appContext

      render(vm, container)
    }
    else {
      instanceMap.get(position)?.instance?.add(config)
    }
  }

  const close = (id?: number) => {
    instanceMap.forEach(({ instance }) => {
      instance?.close(id)
    })
  }

  const closeAll = () => {
    instanceMap.forEach(({ instance }) => {
      instance?.closeAll()
    })
  }

  return {
    notify,
    close,
    closeAll,
  }
}
