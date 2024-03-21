import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

/**
 *
 * @param target
 * @param eventType
 * @param callback
 * 参数 target 支持 HTMLElement、Document 或 Window 类型，也支持 Vue 的 Ref 类型，如果 target 是 Ref 类型，则使用其 value 作为实际目标。

eventType 是一个字符串，表示事件名称。注意如果传递的是EVent的子类型，比如MouseEvent 类型，请自己断言。

callback 参数是 EventListenerOrEventListenerObject 类型，这是一个包含 EventListener 和 EventListenerObject 的联合类型，允许传递一个函数或一个包含 handleEvent方法的对象。
 */
// 支持传入 Ref 类型的 target，以及直接 HTMLElement、Document 或 Window
export function useEventListener(
  target: Ref<HTMLElement | Document | Window | null> | HTMLElement | Document | Window,
  eventType: string,
  callback: EventListenerOrEventListenerObject,
) {
  const realTarget = (target instanceof HTMLElement || target instanceof Window || target instanceof Document) ? target : target.value

  onMounted(() => {
    realTarget?.addEventListener(eventType, callback)
  })

  onUnmounted(() => {
    realTarget?.removeEventListener(eventType, callback)
  })
}
