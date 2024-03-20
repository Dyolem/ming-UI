<script setup lang="ts">
import { inject, useAttrs } from 'vue'

defineOptions({
  name: 'Pause',
  inheritAttrs: false,
})

const attrs = useAttrs()
const injectedProps = inject('iconProps', undefined)
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" v-bind="injectedProps === undefined ? attrs : injectedProps"><path d="M16 12v24M32 12v24" /></svg>
</template>

<style>

</style>
