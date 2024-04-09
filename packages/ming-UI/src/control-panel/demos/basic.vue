<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  traveledDistance: 20,
})
</script>

<template>
  <MControlPanel :model-value="initSliderPosition" />
</template>
