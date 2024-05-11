<script setup lang="ts">
import type { Component } from 'vue'
import { computed, onMounted, ref, shallowRef } from 'vue'
import type { NotificationConfig, NotificationConfigType, NotificationInstance } from './interface'
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
}>()

const props = ref<NotificationConfig>({
  duration: 3000,
  title: 'Prompt',
  content: '',
  showClose: true,
  position: 'top-right',
  offset: 20,
})
const startPosition = computed(() => {
  if (props.value.position.startsWith('bottom')) {
    return {
      flexDirection: 'column-reverse',
    } as const
  }
  else {
    return {
      flexDirection: 'column',
    } as const
  }
})

const sidePosition = computed(() => {
  if (props.value.position.endsWith('left')) {
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
  let offset = 20
  if (props.value.offset !== undefined)
    offset = props.value.offset

  return {
    ...startPosition.value,
    ...sidePosition.value,
    height: `calc(100vh - ${offset * 2}px)`,
    top: `${offset}px`,
  }
})

const translateXValue = computed(() => {
  if (props.value.position.endsWith('left'))
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
function add({ type = 'info', duration = 3000, title = 'Prompt', content = '', showClose = true, position = 'top-right', offset = 20, icon = Success }: NotificationConfig) {
  const instance: NotificationConfigType = {
    type,
    title: titleTypeMap.get(type) || title,
    content,
    duration,
    showClose,
    position,
    offset,
    icon: shallowRef(iconTypeMap.get(type) || Info),
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
  }

  const close = () => {
    closeNotification(instance._id)
  }

  if (typeof duration !== 'number')
    duration = 3000

  if (duration !== 0) {
    instance._timer = setTimeout(() => {
      close()
    }, Math.abs(duration))
  }

  data.value.push(instance)

  return close
}

const dataOrderComputed = computed(() => {
  if (props.value?.position.startsWith('bottom'))
    return data.value.toReversed()
  else return data.value
})

function onReady() {
  prop.onReady?.({ add, close: closeNotification })
}

onMounted(() => {
  onReady()
})

function closeNotification(id: number) {
  const idx = data.value.findIndex(item => item._id === id)
  if (idx !== -1) {
    if (data.value[idx]._timer)
      clearTimeout(data.value[idx]._timer)
    data.value.splice(idx, 1)
  }
}
const isVisible = computed(() => {
  if (data.value.length > 0)
    return true
  else
    return false
})
</script>

<template>
  <Transition name="slide-fade">
    <div v-if="isVisible" class="wrapper" :style="position">
      <TransitionGroup name="slide-fade" tag="div" appear>
        <div v-for="item in dataOrderComputed" :key="item._id" class="container" :style="translateXValue">
          <div class="replaceable-box">
            <div class="native-content-box">
              <div class="left-side">
                <component :is="item.icon" />
              </div>
              <div class="main">
                <h2>{{ item.title }}</h2>
                <p>{{ item.content }}</p>
              </div>
              <div v-if="item.showClose" class="right-side-close" @click="closeNotification(item._id)">
                <CloseSmall />
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Transition>
</template>

<style scoped>
.wrapper {
  position: fixed;
  min-width: 250px;
  width: fit-content;
  z-index: 100;
  display: flex;
  flex-direction: column;
}
.container {
  margin: 20px 0;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .15);

  border-radius: 5px;
  background-color: #fff;
}
.replaceable-box {
  --width-gap: 15px;
  --height-gap: 15px;
  margin: var(--height-gap) var(--width-gap);
}
.native-content-box {
  min-width: 200px;
  max-width: 300px;
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
  cursor: pointer;
}
.main {
  flex: 1;
}
.main h2 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 700;
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
