<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  traveledDistance: 50,
  verticalToTraveledDistance: 0,
})
const backgroundStyle = {
  width: '200px',
  height: '50px',
  backgroundColor: '#e9eaff',
  borderRadius: '5px',
}
</script>

<template>
  <MControlPanel :background-style="backgroundStyle" :model-value="initSliderPosition" :vertical="true" />
</template>
