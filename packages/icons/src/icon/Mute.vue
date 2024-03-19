<script setup lang="ts">
import { inject, useAttrs } from 'vue'

defineOptions({
  name: 'Mute',
  inheritAttrs: false,
})

const attrs = useAttrs()
const injectedProps = inject('iconProps', {})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" v-bind="injectedProps === undefined ? attrs : injectedProps"><path d="M30 18h13v13H30z" /><mask id="a" style="mask-type:alpha" height="13" width="13" y="18" x="30" maskUnits="userSpaceOnUse"><path /></mask><g mask="url(#a)"><path d="m40.735 20.286-8.486 8.485M32.25 20.286l8.485 8.485" /></g><path d="M24 6v36c-7 0-12.201-9.16-12.201-9.16H6a2 2 0 0 1-2-2V17.01a2 2 0 0 1 2-2h5.799S17 6 24 6Z" /></svg>
</template>

<style>

</style>
