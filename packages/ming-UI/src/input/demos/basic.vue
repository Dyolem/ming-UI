<docs>
---
title: 基础使用
---

这是一个`input`基础使用的例子
</docs>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('')
</script>

<template>
  <div class="show-box">
    <div>{{ `输入：${msg}` }}</div>
    <m-input v-model="msg" size="small" />
    <m-input v-model="msg" disabled />
    <m-input v-model="msg" disabled size="large" />
  </div>
</template>
