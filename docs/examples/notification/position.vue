<script setup lang="ts">
import { MNotification } from 'ming-UI'

function notificationByPosition(position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left') {
  MNotification.notify({
    content: 'This is a message.',
    duration: 0,
    position,
  })
}
function closeAll() {
  MNotification.closeAll()
}
</script>

<template>
  <div class="container">
    <m-button type="primary" @click="notificationByPosition('top-left')">
      top-left
    </m-button>
    <m-button type="primary" @click="notificationByPosition('bottom-left')">
      bottom-left
    </m-button>
    <m-button type="primary" @click="notificationByPosition('bottom-right')">
      bottom-right
    </m-button>

    <m-button type="primary" @click="notificationByPosition('top-right')">
      top-right
    </m-button>
    <m-button type="primary" @click="closeAll">
      close all
    </m-button>
  </div>
</template>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
