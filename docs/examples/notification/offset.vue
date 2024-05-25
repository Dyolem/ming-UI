<script setup lang="ts">
import { MNotification } from 'ming-UI'

function info() {
  MNotification.notify({
    type: 'info',
    content: 'This is a message',
    offset: 50,
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
