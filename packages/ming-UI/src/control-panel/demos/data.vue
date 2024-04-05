<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  traveledDistance: 44,
  verticalToTraveledDistance: 0,
})

const backgroundStyle = {
  width: '200px',
  height: '200px',
  backgroundColor: '#e9eaff',
  borderRadius: '10px',
}

const distance = ref({
  traveledDistance: 0,
  verticalToTraveledDistance: 0,
})
</script>

<template>
  <div class="normal">
    <div class="data-one">
      <MControlPanel v-model:model-value="distance" :model-value="initSliderPosition" />
      <div class="position">
        X:<span>{{ distance.traveledDistance }}</span>Y:<span>{{ distance.verticalToTraveledDistance }}</span>
      </div>
    </div>
    <div class="data-one">
      <MControlPanel v-model:model-value="distance" :model-value="initSliderPosition" :vertical="true" />
      <div class="position">
        X:<span>{{ distance.traveledDistance }}</span>Y:<span>{{ distance.verticalToTraveledDistance }}</span>
      </div>
    </div>
  </div>
  <div class="vertical">
    <div class="data-two">
      <MControlPanel :background-style="backgroundStyle" :model-value="initSliderPosition" :dimensional-movement="true" />
      <div class="position">
        X:<span>{{ distance.traveledDistance }}</span>Y:<span>{{ distance.verticalToTraveledDistance }}</span>
      </div>
    </div>
    <div class="data-two">
      <MControlPanel :background-style="backgroundStyle" :model-value="initSliderPosition" :dimensional-movement="true" :vertical="true" />
      <div class="position">
        X:<span>{{ distance.traveledDistance }}</span>Y:<span>{{ distance.verticalToTraveledDistance }}</span>
      </div>
    </div>
  </div>
</template>
