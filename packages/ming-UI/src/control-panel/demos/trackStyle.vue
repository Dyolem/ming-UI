<script setup>
import { ref } from 'vue'

const trackBackgroundColor = 'lightgreen'
const trackThickness = 20
const initDistanceRatio = ref({
  horizontalDistanceRatio: 20,
})
</script>

<template>
  <div class="container">
    <MControlPanel :model-value="initDistanceRatio" :track-background-color="trackBackgroundColor" :track-thickness="trackThickness" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 200px;
}
</style>
