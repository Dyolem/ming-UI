<script setup lang="ts">
import { MIcon, Star } from '@ming-UI/icons'
import { onMounted, ref } from 'vue'
import type { NotificationConfig, NotificationConfigType, NotificationInstance } from './interface'

defineOptions({
  name: 'MNotification',
  inheritAttrs: false,
})

const props = defineProps<{
  onReady: (instance: NotificationInstance) => void
}>()

const data = ref<NotificationConfigType[]>([])
let index = 0

function add(config: NotificationConfig) {
  // console.log(config)

  const instance: NotificationConfigType = {
    ...config,
    _id: index++,

  }

  const close = () => {
    closeNotification(instance._id)
  }
  let duration = instance.duration
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

function onReady() {
  props.onReady?.({ add, close: closeNotification })
}

onMounted(() => {
  onReady()
})

const offsetX = ref<number>(10)

function closeNotification(id: number) {
  const idx = data.value.findIndex(item => item._id === id)
  if (idx !== -1) {
    if (data.value[idx]._timer)
      clearTimeout(data.value[idx]._timer)
    data.value.splice(idx, 1)
  }
}
</script>

<template>
  <div class="wrapper">
    <TransitionGroup name="slide-fade" appear>
      <div v-for="item in data" :key="item._id" class="container">
        <div class="replaceable-box">
          <div class="native-content-box">
            <div class="left-side">
              <MIcon>
                <Star />
              </MIcon>
            </div>
            <div class="main">
              <h1>{{ item.title }}</h1>
              <p>{{ item.content }}</p>
            </div>
            <div v-if="item.showClose" class="right-side-close" @click="closeNotification(item._id)">
              <MIcon>
                <Star />
              </MIcon>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  height: 100%;
}
.container {
  /* position: fixed; */
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1),
    -2px -2px 2px 2px rgba(0, 0, 0, 0.1),
    2px -2px 2px 2px rgba(0, 0, 0, 0.1),
    -2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: #fff;
  z-index: 1000;
  /* top: 20px; */
  right: v-bind(`${offsetX}px`);
}
.replaceable-box {
  --width-gap: 20px;
  --height-gap: 10px;
  margin: var(--height-gap) var(--width-gap);
  background-color: aqua;
}
.native-content-box {
  position: relative;
  min-width: 200px;
  max-width: 300px;

  display: flex;
}
.left-side {
  width: 30px;
  height: 100%;
}
.right-side-close {
  position: absolute;
  top: 1px;
  right: 1px;
  cursor: pointer;
}
.main {
  flex: 1;
  background-color: beige;
}
.main h1 {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
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
  transform: translateX(100%);
  opacity: 0;

}
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-active {
  position: absolute;
}
</style>
