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
    <m-input ref="input" v-model="msg" />
  </div>
</template>
