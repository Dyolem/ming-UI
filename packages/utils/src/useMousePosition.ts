import { ref } from 'vue'
import { useEventListener } from './useDomEvent'

/**
 *
 * @param innerElement
 * 获取鼠标在某个元素内的坐标，坐标原点为盒子左上角，在border外
 * @returns
 */
export function useMouseInnerPosition(innerElement: HTMLElement) {
  console.log(innerElement)

  const x = ref(0)
  const y = ref(0)
  // 使用函数并将 event 显式地断言为 MouseEvent 类型
  useEventListener(innerElement, 'mousemove', (event: Event) => {
    console.log(event)

    const mouseEvent = event as MouseEvent
    x.value = mouseEvent.clientX - innerElement.getBoundingClientRect().left
    y.value = mouseEvent.clientY - innerElement.getBoundingClientRect().top
  })

  return { x, y }
}
