<script setup lang="ts">
import { MNotification } from 'ming-UI'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
function info() {
  MNotification.notify({
    content: 'This is a message',
  }, instance?.appContext)
}
</script>

<template>
  <div>
    <m-button type="primary" @click="info">
      Notify
    </m-button>
  </div>
</template>
