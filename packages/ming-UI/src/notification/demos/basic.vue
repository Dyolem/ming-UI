<script setup lang="ts">
import { MNotification } from 'ming-UI'

function info() {
  MNotification.notify({
    content: 'This an info message.',
    duration: 3000,
  })
}
</script>

<template>
  <div>
    <m-button @click="info">
      notify
    </m-button>
  </div>
</template>
