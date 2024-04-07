<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  traveledDistance: 50,
  verticalToTraveledDistance: 0,
})
function formatter(axis) {
  console.log(axis)
  const traveledDistance = `this ${axis}`
  return traveledDistance
}
const backgroundStyle = {
  width: '200px',
  height: '200px',
  backgroundColor: '#e9eaff',
  borderRadius: '10px',
}

// const distance = ref({
//   traveledDistance: 44,
//   verticalToTraveledDistance: 9,
// })
const dimensionalDistance = ref({
  traveledDistance: 66,
  verticalToTraveledDistance: 25,
})
function dimensionalFormatter(axis, vertical) {
  console.log(axis, vertical)
  const traveledDistance = `this ${axis}`
  const verticalToTraveledDistance = `this ${vertical}`
  return {
    traveledDistance,
    verticalToTraveledDistance,
  }
}
</script>

<template>
  <div class="container">
    <MControlPanel :model-value="initSliderPosition" :formatter-tooltip="formatter" :display-tooltip="true" />
    <div>
      <MControlPanel v-model="dimensionalDistance" :background-style="backgroundStyle" :dimensional-movement="true" :formatter-tooltip="dimensionalFormatter" :display-tooltip="true" />
      <div class="position">
        X:<span>{{ dimensionalDistance.traveledDistance }}</span>
        Y:<span>{{ dimensionalDistance.verticalToTraveledDistance }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
}
</style>
