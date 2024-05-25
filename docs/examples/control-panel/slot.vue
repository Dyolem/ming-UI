<script setup>
import { ref } from 'vue'
import { Like, MIcon } from '@ming-UI/icons'

const initSliderPosition = ref({
  horizontalDistanceRatio: 15,
})
</script>

<template>
  <MControlPanel v-model="initSliderPosition" :slider-rotate="40" :display-tooltip="true">
    <template #slider-icon>
      <MIcon>
        <Like />
      </MIcon>
    </template>
  </MControlPanel>
</template>
