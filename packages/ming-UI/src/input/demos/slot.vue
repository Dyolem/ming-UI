<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('')
</script>

<template>
  <div class="show-box">
    <div>{{ `输入：${msg}` }}</div>
    <m-input v-model="msg">
      <template #prefix>
        A
      </template>
      <template #suffix>
        B
      </template>
    </m-input>
  </div>
</template>
