<script setup lang="ts">
import { inject, useAttrs } from 'vue'

defineOptions({
  name: 'BookMark',
  inheritAttrs: false,
})

const attrs = useAttrs()
const injectedProps = inject('iconProps', undefined)
</script>

<template>
  <svg viewBox="0 0 48 48" v-bind="injectedProps === undefined ? attrs : injectedProps" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 44C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4H38C39.1046 4 40 4.89543 40 6V42C40 43.1046 39.1046 44 38 44H10Z" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M21 22V4H33V22L27 15.7273L21 22Z" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 4H38" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<style>

</style>
