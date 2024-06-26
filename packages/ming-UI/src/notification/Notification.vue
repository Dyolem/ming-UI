<script setup lang="ts">
import type { Component } from 'vue'
import { computed, h, isVNode, nextTick, onMounted, ref, render, shallowRef } from 'vue'
import type { NotificationConfig, NotificationConfigType, NotificationInstance, Position } from './interface'
import Success from './components/Success.vue'
import Info from './components/Info.vue'
import Error from './components/Error.vue'
import Warning from './components/Warning.vue'
import CloseSmall from './components/CloseSmall.vue'

defineOptions({
  name: 'MNotification',
})

const prop = defineProps<{
  onReady: (instance: NotificationInstance) => void
  onEmpty: () => void
  onClose: (position: Position) => void
}>()
const DEFAULT_DURATION = 3000
const DEFAULT_OFFSET = 30
const props = ref<NotificationConfig>({
  duration: 3000,
  title: 'Prompt',
  content: '',
  showClose: true,
  position: 'top-right',
  offset: DEFAULT_OFFSET,
  zIndex: 100,
})
const startPosition = computed(() => {
  let offset = DEFAULT_OFFSET
  if (props.value.offset !== undefined)
    offset = props.value.offset
  if (props.value.position?.startsWith('bottom')) {
    return {
      flexDirection: 'column-reverse',
      bottom: `${offset}px`,
    } as const
  }
  else {
    return {
      flexDirection: 'column',
      top: `${offset}px`,
    } as const
  }
})

const sidePosition = computed(() => {
  if (props.value.position?.endsWith('left')) {
    return {
      left: '20px',
    } as const
  }
  else {
    return {
      right: '20px',
    } as const
  }
})

const position = computed(() => {
  return {
    ...startPosition.value,
    ...sidePosition.value,
    zIndex: props.value.zIndex,
  }
})

const translateXValue = computed(() => {
  if (props.value.position?.endsWith('left'))
    return { '--slide-translate-x': '-100%' }
  else
    return { '--slide-translate-x': '100%' }
})
const data = ref<NotificationConfigType[]>([])
let index = 0

const iconTypeMap = new Map<string, Component>([
  ['success', Success],
  ['info', Info],
  ['error', Error],
  ['warning', Warning],
])
const titleTypeMap = new Map<string, string>([
  ['success', 'Success'],
  ['info', 'Prompt'],
  ['error', 'Error'],
  ['warning', 'Warning'],
])
function add({ type = 'info', duration = DEFAULT_DURATION, title = '', content = '', showClose = true, position = 'top-right', offset = DEFAULT_OFFSET, icon = Info, showIcon = true, dangerouslyUseHTMLString = false, appendTo, zIndex = 100, onClick, onClose }: NotificationConfig) {
  const instance: NotificationConfigType = {
    type,
    title: title || titleTypeMap.get(type),
    content,
    duration,
    showClose,
    position,
    offset,
    icon: shallowRef(iconTypeMap.get(type) || Info),
    showIcon,
    appendTo,
    dangerouslyUseHTMLString,
    onClick,
    onClose,
    _id: index++,
  }

  props.value = {
    type,
    title,
    content,
    duration,
    showClose,
    position,
    offset,
    icon,
    showIcon,
    zIndex,
  }

  if (typeof duration !== 'number')
    duration = DEFAULT_DURATION

  if (duration !== 0) {
    instance._timer = setTimeout(() => {
      closeNotification(instance._id)
    }, Math.abs(duration))
  }
  data.value.push(instance)
  nextTick(() => {
    const customRender = createCustomRender(instance)
    customRender(instance.title!, 'title')
    customRender(instance.content, 'content')
  })
}

const dataOrderComputed = computed(() => {
  if (props.value.position?.startsWith('bottom'))
    return data.value.toReversed()
  else return data.value
})

function onReady() {
  prop.onReady?.({ add, close: closeNotification, closeAll: closeAllNotification })
}

onMounted(() => {
  onReady()
})

function clickNotification(id: number = data.value[0]?._id ?? 0) {
  const idx = data.value.findIndex(item => item._id === id)
  if (idx !== -1) {
    if (data.value[idx].onClick)
      data.value[idx].onClick?.(id)
  }
}
function closeNotification(id: number = data.value[0]?._id ?? 0) {
  const idx = data.value.findIndex(item => item._id === id)
  if (idx !== -1) {
    if (data.value[idx]._timer)
      clearTimeout(data.value[idx]._timer)

    onClose(data.value[idx].position as Position)
    data.value[idx].onClose?.(id)
    data.value.splice(idx, 1)
    checkEmpty()
  }
}
function closeAllNotification() {
  data.value.forEach((item) => {
    if (item._timer)
      clearTimeout(item._timer)
  })
  data.value = []
  checkEmpty()
}
function checkEmpty() {
  if (data.value.length === 0) {
    // 延迟检查以确保动画完成
    setTimeout(() => {
      if (data.value.length === 0)
        prop.onEmpty?.()
    }, 400) // 延迟时间需要超过动画时间
  }
}
function onClose(position: Position) {
  prop.onClose?.(position)
}

function createCustomRender(instance: NotificationConfigType) {
  const { _id, dangerouslyUseHTMLString, position } = instance
  return function customRender(target: string | Component, targetName: 'title' | 'content') {
    if (!dangerouslyUseHTMLString) {
      let vNode

      if (isVNode(target))
        vNode = target
      else if (typeof target === 'string')
        vNode = h('div', { class: `custom-${targetName}-vnode` }, target)

      else return

      const container = document.querySelector(`[data-id="${position}-${targetName}-${_id}"]`)
      if (container && vNode)
        render(vNode, container)
    }
  }
}
</script>

<template>
  <div class="wrapper" :style="position">
    <TransitionGroup name="slide-fade" tag="div" appear>
      <div
        v-for="item in dataOrderComputed" :key="item._id" class="container" :style="translateXValue"
        @click="clickNotification(item._id)"
      >
        <div class="replaceable-box public">
          <div class="native-content-box">
            <div v-if="item.showIcon" class="left-side">
              <component :is="item.icon" />
            </div>
            <div class="main">
              <div
                v-if="!item.dangerouslyUseHTMLString"
                class="custom-title-box"
                :data-id="`${item.position}-title-${item._id}`"
              />
              <div
                v-if="item.dangerouslyUseHTMLString"
                :data-id="`${item.position}-title-${item._id}`"
                class="custom-title-box"
                v-html="item.title"
              />
              <div
                v-if="!item.dangerouslyUseHTMLString"
                class="custom-content-box"
                :data-id="`${item.position}-content-${item._id}`"
              />
              <div
                v-if="item.dangerouslyUseHTMLString"
                :data-id="`${item.position}-content-${item._id}`"
                class="custom-content-box"
                v-html="item.content"
              />
            </div>
          </div>
        </div>
        <div v-if="item.showClose" class="right-side-close public" @click="closeNotification(item._id)">
          <CloseSmall />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.public {
  --width-gap: 15px;
  --height-gap: 10px;
}
.wrapper {
  position: fixed;
  width: fit-content;
  z-index:100;
  display: flex;
  flex-direction: column;
}
.container {
  margin: 15px 0;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .15);
  border-radius: 5px;
  background-color: #fff;
}
.replaceable-box {
  margin: var(--height-gap) var(--width-gap);
}
.native-content-box {
  width: 200px;
  display: flex;
  justify-content: space-between;
}
.left-side {
  display: flex;
  justify-content: center;
  margin-right: 10px;
  width: 30px;
  height: 100%;
}
.right-side-close {
  padding: 0 5px;
  margin-top: var(--height-gap);
  cursor: pointer;
}
.main {
  flex: 1;
}
.main .custom-title-box {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 700;
  color: #000;
}
.main .custom-content-box {
  font-size: 14px;
  color: #606266;
}
.scroll {
  overflow: auto;
  max-height: 100px;
}
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-move,
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-move,
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(var(--slide-translate-x, 20px));
}
.slide-fade-leave-to {
  opacity: 0;
}
.slide-fade-leave-active {
  position: absolute;
}
</style>
