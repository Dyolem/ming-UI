<script setup>
import { ref } from 'vue'

const initSliderPosition = ref({
  verticalDistanceRatio: 20,
})
</script>

<template>
  <MControlPanel v-model="initSliderPosition" :vertical="true" />
</template>
