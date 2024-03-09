<docs>
---
title: 基础使用
---

这是一个`button`基础使用的例子
</docs>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('hello')
</script>

<template>
  <div>{{ msg }}</div>
  <MingButton />
</template>
