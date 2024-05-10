<docs>
---
title: 基本使用
---

  这是notification的基本使用
</docs>

<script setup lang="ts">
import { MNotification } from 'ming-UI'
import { getCurrentInstance, h } from 'vue'

// import Test from './components/test.vue'

const instance = getCurrentInstance()
function info() {
  MNotification.info({
    title: '通知',
    content: 'hello world',
    appContext: instance?.appContext,
    duration: 1000,
    showClose: true,
  })
}
</script>

<template>
  <div>
    <m-button @click="info">
      弹框
    </m-button>
  </div>
</template>
