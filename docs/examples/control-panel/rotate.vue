<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  horizontalDistanceRatio: 20,
})
</script>

<template>
  <div class="father">
    <div class="placeholder">
      <MControlPanel :model-value="initSliderPosition" />
    </div>
  </div>
</template>

<style scoped>
  .father {
    transform: rotate(90deg);
  }
  .placeholder {
    transform: rotate(-90deg);
  }
</style>
