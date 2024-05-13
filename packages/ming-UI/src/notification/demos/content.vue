<script setup lang="ts">
import { MNotification } from 'ming-UI'
import { h } from 'vue'
import VNode from './VNode.vue'

function renderHTML() {
  MNotification.notify({
    content: '<span style=color:pink;font-size:20px;>This is a message.</span>',
    duration: 0,
    dangerouslyUseHTMLString: true,
  })
}
function renderVNode() {
  MNotification.notify({
    title: h(VNode),
    content: h(VNode),
    duration: 0,
  })
}
function renderCommonMessage() {
  MNotification.notify({
    content: 'This is a message.',
    duration: 0,
  })
}
</script>

<template>
  <div class="container">
    <m-button type="primary" @click="renderHTML">
      render HTML
    </m-button>
    <m-button type="primary" @click="renderVNode">
      render VNode
    </m-button>
    <m-button type="primary" @click="renderCommonMessage">
      render common message
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
