<script setup>
import { getCurrentInstance } from 'vue'
import { openColorPicker } from 'ming-UI'

// const { appContext } = getCurrentInstance()
// const openColorPicker = appContext.config.globalProperties.$openColorPicker
function open() {
  openColorPicker()
}
</script>

<template>
  <MColorPicker />
  <div @click="open">
    123
  </div>
</template>
