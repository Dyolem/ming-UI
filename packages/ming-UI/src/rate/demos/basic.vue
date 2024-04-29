<script setup>
import { ref } from 'vue'

const score = ref(5)
</script>

<template>
  <span>{{ score }}</span>
  <MRate v-model="score" />
</template>
