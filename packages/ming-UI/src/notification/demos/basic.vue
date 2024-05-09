<script setup>
import { getCurrentInstance } from 'vue'
import { MButton } from 'ming-UI'

const { appContext } = getCurrentInstance()
const MNotification = appContext.config.globalProperties.$MNotification
function open() {
  MNotification({
    message: 'hello world',
    type: 'success',
    title: 'head',
  })
}
</script>

<template>
  <MButton @click="open" />
</template>
