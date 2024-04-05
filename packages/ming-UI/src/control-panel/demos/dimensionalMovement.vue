<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  traveledDistance: 50,
  verticalToTraveledDistance: 20,
})
const backgroundStyle = {
  width: '200px',
  height: '200px',
  backgroundColor: '#e9eaff',
  borderRadius: '10px',
}
</script>

<template>
  <div class="container">
    <MControlPanel :model-value="initSliderPosition" :dimensional-movement="true" :background-style="backgroundStyle" />
    <MControlPanel :model-value="initSliderPosition" :dimensional-movement="true" :background-style="backgroundStyle" :display-track="true" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 200px;
}
</style>
