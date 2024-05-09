<script setup>
import { getCurrentInstance } from 'vue'
import { MButton } from 'ming-UI'

const { appContext } = getCurrentInstance()
const MNotification = appContext.config.globalProperties.$MNotification
function open() {
  MNotification()
}
</script>

<template>
  <MButton @click="open" />
</template>
