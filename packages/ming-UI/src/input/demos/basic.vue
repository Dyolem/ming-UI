<docs>
---
title: 基础使用
---

这是一个`input`基础使用的例子
</docs>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const msg = ref('')
const input = ref<HTMLInputElement>()
onMounted(() => {
  input.value!.focus()
})
</script>

<template>
  <div class="show-box">
    <div>{{ `输入：${msg}` }}</div>
    <m-input ref="input" v-model="msg" size="small">
      <template #prefix>
        123
      </template>
      <template #suffix>
        123
      </template>
    </m-input>
    <m-input v-model="msg" disabled>
      <template #prefix>
        123
      </template>
      <template #suffix>
        123
      </template>
    </m-input>
    <m-input v-model="msg" disabled size="large" />
  </div>
</template>
