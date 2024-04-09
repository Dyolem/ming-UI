<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  verticalToTraveledDistance: 30,
})
const mControlPanelRef = ref(null)
function formatter(distance) {
  const percentage = `${Math.ceil(distance / mControlPanelRef.value.verticalMax * 100)}%`
  return percentage
}
const backgroundStyle = {
  width: '200px',
  height: '200px',
  backgroundColor: '#e9eaff',
  borderRadius: '10px',
}

const dimensionalDistance = ref({
  traveledDistance: 66,
  verticalToTraveledDistance: 25,
})
function dimensionalFormatter(travel, vertical) {
  const traveledDistance = `X:${travel}`
  const verticalToTraveledDistance = `Y:${vertical}`
  return `${traveledDistance},${verticalToTraveledDistance}`
}
</script>

<template>
  <div class="container">
    <MControlPanel ref="mControlPanelRef" :model-value="initSliderPosition" :formatter-tooltip="formatter" :display-tooltip="true" :vertical="true" placement="top" />
    <div>
      <MControlPanel v-model="dimensionalDistance" :background-style="backgroundStyle" :dimensional-movement="true" :formatter-tooltip="dimensionalFormatter" :display-tooltip="true" placement="left" />
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
