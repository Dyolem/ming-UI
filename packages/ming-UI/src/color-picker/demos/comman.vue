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
  <div class="test" @click="open">
    <button>click</button>
  </div>
</template>
