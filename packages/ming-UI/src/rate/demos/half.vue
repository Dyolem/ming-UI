<script setup>
import { ref } from 'vue'

const score = ref(2)
</script>

<template>
  <MRate v-model="score" :allow-half="true" />
</template>
