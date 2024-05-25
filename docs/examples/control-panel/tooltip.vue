<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  verticalDistanceRatio: 30,
})
const mControlPanelRef = ref(null)
function formatter(ratio) {
  const percentage = `${ratio}%`
  return percentage
}
const backgroundStyle = {
  width: '200px',
  height: '200px',
  backgroundColor: '#e9eaff',
  borderRadius: '10px',
}

const dimensionalDistanceRatio = ref({
  horizontalDistanceRatio: 66,
  verticalDistanceRatio: 25,
})
function dimensionalFormatter(horizontalRatio, verticalRatio) {
  const horizontalDistance = Math.round(horizontalRatio / 100 * mControlPanelRef.value.horizontalMax)
  const verticalDistance = Math.round(verticalRatio / 100 * mControlPanelRef.value.verticalMax)
  return `X:${horizontalDistance},Y:${verticalDistance}`
}
</script>

<template>
  <div class="container">
    <MControlPanel v-model="initSliderPosition" :formatter-tooltip="formatter" :display-tooltip="true" :vertical="true" placement="top" />
    <div>
      <MControlPanel ref="mControlPanelRef" v-model="dimensionalDistanceRatio" :background-style="backgroundStyle" :dimensional-movement="true" :formatter-tooltip="dimensionalFormatter" :display-tooltip="true" placement="left" />
    </div>
  </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
}
</style>
