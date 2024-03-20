<script setup lang="ts">
import { inject, useAttrs } from 'vue'

defineOptions({
  name: 'Download',
  inheritAttrs: false,
})

const attrs = useAttrs()
const injectedProps = inject('iconProps', undefined)
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" v-bind="injectedProps === undefined ? attrs : injectedProps"><path d="M6 24.008V42h36V24" /><path d="m33 23-9 9-9-9M23.992 6v26" /></svg>
</template>

<style>

</style>
