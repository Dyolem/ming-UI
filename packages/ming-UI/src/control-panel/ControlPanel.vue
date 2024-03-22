<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { useMouseInnerPosition } from '@ming-UI/utils'

defineOptions({
  name: 'MControlPanel',
})
</script>

<template>
  <div class="background-board">
    <div class="track-bar" />
    <!-- <m-icon>
      <like />
    </m-icon> -->
    <slot name="slider">
      <div class="slider" />
    </slot>
  </div>
</template>

<style scoped>
.background-board {
    display: flex;
    justify-content: center;
    position: relative;
    width: 30px;
    height: 100px;
    background-color: antiquewhite;
}
.track-bar {
    position: relative;
    width: 10px;
    height: 100%;
    background-color: aquamarine;
}
.slider {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid black;
}
.slider::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #fff;
  transform: scale(0.9);
}
</style>
