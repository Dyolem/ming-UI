import type { VNode } from 'vue'

export interface NotificationConfig {
  content: string | VNode
  title: string | VNode
  duration?: number
  appContext?: any
  showClose?: boolean
}

export interface NotificationConfigType extends NotificationConfig {
  _id: number
  _timer?: ReturnType<typeof setTimeout>
}

export interface NotificationInstance {
  add: (config: NotificationConfig) => (() => void)
  close: (id: number) => void
}
