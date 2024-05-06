<script setup lang="ts">
import { inject, useAttrs } from 'vue'

defineOptions({
  name: 'DislikeTwo',
  inheritAttrs: false,
})

const attrs = useAttrs()
const injectedProps = inject('iconProps', undefined)
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" v-bind="injectedProps === undefined ? attrs : injectedProps"><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M28 20L20 28L28 20Z" /><path d="M28 20L20 28" stroke-linecap="round" stroke-linejoin="round" /><path fill-rule="evenodd" clip-rule="evenodd" d="M20 20.0001L28 28L20 20.0001Z" /><path d="M20 20.0001L28 28" stroke-linecap="round" stroke-linejoin="round" /></svg>
</template>

<style>

</style>
