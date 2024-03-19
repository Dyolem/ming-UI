<script setup lang="ts">
import { ref } from 'vue'
import type { iconStyleProp } from '../interface'

defineOptions({
  name: 'MDownload',
})
withDefaults(defineProps<iconStyleProp>(), {
  size: 16,
  color: '#333',
  fill: 'none',
})
const iconRef = ref(null)
defineExpose({
  iconRef,
})
</script>

<template>
  <div ref="iconRef">
    <svg xmlns="http://www.w3.org/2000/svg" :weight="size" :height="size" :fill="fill" viewBox="0 0 48 48"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="4" :stroke="color" d="M6 24.008V42h36V24" data-follow-stroke="#333" /><path stroke-linejoin="round" stroke-linecap="round" stroke-width="4" :stroke="color" d="m33 23-9 9-9-9M23.992 6v26" data-follow-stroke="#333" /></svg>
  </div>
</template>

<style>

</style>
