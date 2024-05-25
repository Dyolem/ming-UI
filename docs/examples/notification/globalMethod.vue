<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const { appContext } = getCurrentInstance()
const notify = appContext.config.globalProperties.$notification
function info() {
  notify({
    type: 'info',
    content: 'This is a message',
  })
}
</script>

<template>
  <div>
    <m-button type="primary" @click="info">
      notify
    </m-button>
  </div>
</template>
