<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  traveledDistance: 50,
  verticalToTraveledDistance: 0,
})
</script>

<template>
  <MControlPanel :model-value="initSliderPosition" />
</template>
