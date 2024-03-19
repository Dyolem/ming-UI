<script setup lang="ts">
import { computed, provide } from 'vue'
import type { iconStyleProp } from './interface.ts'

defineOptions({
  name: 'MIcon',
})

const props = withDefaults(defineProps<iconStyleProp>(), {
  size: 16,
  stroke: '#333',
  fill: 'none',
  strokeWidth: '4px',
})

const defaultSVGProps = computed(() => {
  return {
    height: props.size,
    width: props.size,
    stroke: props.stroke,
    fill: props.fill,
    'stroke-width': props.strokeWidth,
  }
})
// 提供 size 属性给任何深层嵌套的组件
provide('iconProps', defaultSVGProps)
</script>

<template>
  <div class="icon">
    <slot />
  </div>
</template>
