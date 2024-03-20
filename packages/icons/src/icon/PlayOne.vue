<script setup lang="ts">
import { inject, useAttrs } from 'vue'

defineOptions({
  name: 'PlayOne',
  inheritAttrs: false,
})

const attrs = useAttrs()
const injectedProps = inject('iconProps', undefined)
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" v-bind="injectedProps === undefined ? attrs : injectedProps"><path d="M15 24V11.876l10.5 6.062L36 24l-10.5 6.062L15 36.124V24Z" /></svg>
</template>

<style>

</style>
