import type { Component, VNode } from 'vue'

export interface NotificationConfig {
  type?: 'success' | 'info' | 'warning' | 'error'
  content: string | VNode
  title?: string | VNode
  duration?: number
  appContext?: any
  showClose?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  offset?: number
  appendTo?: HTMLElement
  icon?: Component
  showIcon?: boolean
}

export interface NotificationConfigType extends NotificationConfig {
  _id: number
  _timer?: ReturnType<typeof setTimeout>
}

export interface NotificationInstance {
  add: (config: NotificationConfig) => (() => void)
  close: (id: number) => void
}
