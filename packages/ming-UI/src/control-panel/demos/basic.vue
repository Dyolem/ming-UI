<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  horizontalDistanceRatio: 20,
})
</script>

<template>
  <MControlPanel v-model="initSliderPosition" />
</template>
