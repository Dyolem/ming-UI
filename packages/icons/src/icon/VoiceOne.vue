<script setup lang="ts">
import { inject, useAttrs } from 'vue'

defineOptions({
  name: 'VoiceOne',
  inheritAttrs: false,
})

const attrs = useAttrs()
const injectedProps = inject('iconProps', {})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" v-bind="injectedProps === undefined ? attrs : injectedProps"><path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z" /><path d="M30 18v12M36 22v4M18 18v12M12 22v4M24 14v20" /></svg>
</template>

<style>

</style>
