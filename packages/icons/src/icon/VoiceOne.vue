<script setup lang="ts">
import { ref } from 'vue'
import type { iconStyleProp } from '../interface'

defineOptions({
  name: 'MVoiceOne',
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
    <svg xmlns="http://www.w3.org/2000/svg" :weight="size" :height="size" :fill="fill" viewBox="0 0 48 48"><path stroke-width="4" :stroke="color" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z" data-follow-stroke="#333" /><path stroke-linecap="round" stroke-width="4" :stroke="color" d="M30 18v12M36 22v4M18 18v12M12 22v4M24 14v20" data-follow-stroke="#333" /></svg>
  </div>
</template>

<style>

</style>
