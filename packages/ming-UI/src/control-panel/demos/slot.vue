<script setup>
import { ref } from 'vue'
import { Like, MIcon } from '@ming-UI/icons'

const initSliderPosition = ref({
  traveledDistance: 50,
  verticalToTraveledDistance: 0,
})
</script>

<template>
  <MControlPanel :model-value="initSliderPosition" :slider-rotate="30">
    <template #slider-icon>
      <MIcon>
        <Like />
      </MIcon>
    </template>
  </MControlPanel>
</template>
