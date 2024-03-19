<script setup lang="ts">
import { ref } from 'vue'
import type { iconStyleProp } from '../interface'

defineOptions({
  name: 'MMute',
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
    <svg xmlns="http://www.w3.org/2000/svg" :weight="size" :height="size" fill="none" viewBox="0 0 48 48"><path fill="#333" opacity=".01" d="M30 18h13v13H30z" data-follow-fill="#333" /><mask id="a" style="mask-type:alpha" height="13" width="13" y="18" x="30" maskUnits="userSpaceOnUse"><path fill="#333" d="M30 18h13v13H30z" data-follow-fill="#333" /></mask><g mask="url(#a)" stroke-linejoin="round" stroke-linecap="round" stroke-width="4" :stroke="color" data-follow-stroke="#333"><path d="m40.735 20.286-8.486 8.485M32.25 20.286l8.485 8.485" /></g><path stroke-linejoin="round" stroke-width="4" :stroke="color" d="M24 6v36c-7 0-12.201-9.16-12.201-9.16H6a2 2 0 0 1-2-2V17.01a2 2 0 0 1 2-2h5.799S17 6 24 6Z" data-follow-stroke="#333" /></svg>
  </div>
</template>

<style>

</style>
