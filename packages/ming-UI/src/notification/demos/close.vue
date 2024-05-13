<script setup lang="ts">
import { MNotification } from 'ming-UI'

function info() {
  MNotification.notify({
    type: 'info',
    content: 'This is a message',
    duration: 0,
  })
}
function close() {
  MNotification.close()
}
function closeAll() {
  MNotification.closeAll()
}
</script>

<template>
  <div>
    <m-button type="primary" @click="info">
      Notify
    </m-button>
    <m-button type="primary" @click="close">
      Close
    </m-button>
    <m-button type="primary" @click="closeAll">
      CloseAll
    </m-button>
  </div>
</template>
