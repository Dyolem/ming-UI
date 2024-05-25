<script setup lang="ts">
import { MNotification } from 'ming-UI'

function info() {
  MNotification.notify({
    type: 'info',
    content: 'This is a message',
    showClose: false,
  })
}
</script>

<template>
  <div>
    <m-button type="primary" @click="info">
      Hide Close Button
    </m-button>
  </div>
</template>
