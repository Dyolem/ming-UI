<script setup lang="ts">
import { MNotification } from 'ming-UI'

function success() {
  MNotification.notify({
    type: 'success',
    content: 'This is a message.',
  })
}
function info() {
  MNotification.notify({
    type: 'info',
    content: 'This is a message',
  })
}
function warning() {
  MNotification.notify({
    type: 'warning',
    content: 'This is a message',
  })
}
function error() {
  MNotification.notify({
    type: 'error',
    content: 'This is a message',
  })
}
</script>

<template>
  <div class="container">
    <m-button type="primary" @click="success">
      success
    </m-button>
    <m-button type="primary" @click="info">
      info
    </m-button>
    <m-button type="primary" @click="warning">
      warning
    </m-button>
    <m-button type="primary" @click="error">
      error
    </m-button>
  </div>
</template>

<style scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>
