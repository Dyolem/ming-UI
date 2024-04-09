<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  verticalToTraveledDistance: 20,
})
</script>

<template>
  <MControlPanel :model-value="initSliderPosition" :vertical="true" />
</template>
