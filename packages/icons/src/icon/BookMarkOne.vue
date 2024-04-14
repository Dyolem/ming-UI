<script setup lang="ts">
import { inject, useAttrs } from 'vue'

defineOptions({
  name: 'BookMarkOne',
  inheritAttrs: false,
})

const attrs = useAttrs()
const injectedProps = inject('iconProps', undefined)
</script>

<template>
  <svg viewBox="0 0 48 48" v-bind="injectedProps === undefined ? attrs : injectedProps" xmlns="http://www.w3.org/2000/svg">
    <path d="M34 10V4H8V38L14 35" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /><path d="M14 44V10H40V44L27 37.7273L14 44Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round" />
  </svg>
</template>

<style>

</style>
