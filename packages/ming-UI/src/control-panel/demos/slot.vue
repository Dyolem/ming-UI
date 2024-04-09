<script setup>
import { ref } from 'vue'
import { Like, MIcon } from '@ming-UI/icons'

const initSliderPosition = ref({
  traveledDistance: 50,
})
</script>

<template>
  <MControlPanel :model-value="initSliderPosition" :slider-rotate="40" :display-tooltip="true">
    <template #slider-icon>
      <MIcon>
        <Like />
      </MIcon>
    </template>
  </MControlPanel>
</template>
