<script setup lang="ts">
import { ref } from 'vue'
import type { iconStyleProp } from '../interface'

defineOptions({
  name: 'MPause',
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
    <svg xmlns="http://www.w3.org/2000/svg" :fill="fill" :weight="size" :height="size" viewBox="0 0 48 48"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="4" :stroke="color" d="M16 12v24M32 12v24" data-follow-stroke="#333" /></svg>
  </div>
</template>

<style>

</style>
