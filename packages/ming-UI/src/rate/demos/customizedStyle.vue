<script setup>
import { ref } from 'vue'

const score = ref(2)
</script>

<template>
  <MRate v-model="score" :allow-half="true" :grayscale="0.4" stroke="none" bottom-layer-fill-color="gold" />
</template>
