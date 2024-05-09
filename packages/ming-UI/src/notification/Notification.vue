<script setup lang="ts">
import { MIcon, Star } from '@ming-UI/icons'
import { ref } from 'vue'

defineOptions({
  name: 'MNotification',
})

const offsetX = ref<number>(10)

const isShow = ref(true)
function closeNotification() {
  isShow.value = false
}
</script>

<template>
  <Transition name="slide-fade">
    <div v-if="isShow" class="container vp-raw">
      <div class="replaceable-box">
        <div class="native-content-box">
          <div class="left-side">
            <MIcon>
              <Star />
            </MIcon>
          </div>
          <div class="main">
            <h1>head</h1>
            <p> close          This is a message that does not automatically close          This is a message that does not automatically close</p>
          </div>
          <div class="right-side-close" @click="closeNotification()">
            <MIcon>
              <Star />
            </MIcon>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.container {
  position: fixed;
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
  top: 20px;
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
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
